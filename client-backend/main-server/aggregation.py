from google import genai
import json
from dotenv import load_dotenv
import os

# Load variables from .env
load_dotenv()

# Access the key
api_key = os.getenv("GEMINI_API_KEY")

class AggregationAgent: 

    def __init__(self): 
        self.summarizer = Gemini(
            prompt = """You will be provided with a collection of community notes regarding a topic from a statement that someone is seeking context for. 
            Succinctly summarize the notes to comprehensively capture the key points brought up across the notes. Emphasize and prioritize repeated points.
            Do not preface the summary with anything such as "the notes say".
            Output only a summary of {length} words or less. Community notes: {notes}, statement: {statement}. 
            Only use information from the notes that is relevant to the statement to create the summary.
            If there are no notes, return "No community context for this statement."
            """
        )

        self.aggregator = Gemini(
            prompt = """you will be provided with a group of summaries.
              Your role is to succinctly and comprehensively summarize the collections of summaries into a single summary. 
               ensure that all key points made in the individual summaries are captured in the new summary.
                Emphasize and prioritize key points that are repeated across multiple summaries.
                Do not preface the new summary with any introduction.
               The summary should be 50 words or less and only include information from the other summaries.  
               return just the new summary. 
               summaries to summarize: {summaries}
             """
        )



    def summarize(self, notes: list[str],statement: str,  max_size:int, output_size:int) -> str: 
        #if number of notes is below threshold, just summarize
        if notes is None or len(notes) == 0: 
            return "No community context for this statement."
        if len(notes) < max_size: 
            output = self.summarizer.run({"notes": notes, "statement": statement, "length": output_size})
            return output
        
        #if above threshold, divide, summarize then aggregate
        sum_list = []
        min_size = len(notes) // max_size
        left = len(notes) - (min_size * max_size)
        i = 0
        
        while i < max_size: 
            if i < left: 
                sum_list.append(self.summarizer.run({"notes": notes[i: i + min_size + 1], "statement": statement, "length": output_size}))
                i += min_size + 1
            else: 
                sum_list.append(self.summarizer.run({"notes": notes[i: i + min_size], "statement": statement, "length": output_size}))
                i += min_size
        print('sum list ----------')
        print(sum_list)
        output = self.aggregate(sum_list)
        return output
    
    
    def aggregate(self, summaries: list[str], threshold:int = 10) -> str: 
        
        if len(summaries) > threshold: 
            agg_list = []
            #split and recurse 
            min_size = len(summaries) // threshold
            left = len(summaries) - (min_size * threshold)
            i = 0
            while i < threshold: 
                if i < left: 
                    agg_list.append(self.agregate(summaries[i: i + min_size + 1]))
                    i += min_size + 1
                else: 
                    agg_list.append(self.agregate(summaries[i: i + min_size]))
                    i += min_size
            summaries = agg_list
        
        output = self.aggregator.run({"summaries": summaries})
        return output


class Gemini:
    def __init__(self, prompt:str):
        self.prompt = prompt        
    
    def run(self, paramaters: dict = None) -> str:
        prompt = self.prompt
        if paramaters: 
            prompt = self.prompt.format(**paramaters)
        with genai.Client(api_key=api_key) as client:
            response = client.models.generate_content(
                model="gemini-2.0-flash",  
                contents=prompt
            )
        
        return response.text


if __name__ == "__main__":
    agent = AggregationAgent()

    notes = [
        "The company’s profits increased 20% last quarter due to improved efficiency.",
        "Analysts note that cost-cutting measures led to higher margins.",
        "The CEO mentioned the company plans to expand internationally next year."
    ]

    statement = "Company Q4 performance and future plans."

    result = agent.summarize(notes, statement, max_size=2, output_size=50)
    print("---- Test 1 Result ----")
    print(result)

# import asyncio
# from google.genai import Client

# MODEL_ID = "gemini-2.0-flash"

# async def main():
#     async with Client().aio as aclient:
#         task1 = aclient.models.generate_content(
#             model=MODEL_ID,
#             contents="Hello"
#         )
#         task2 = aclient.models.generate_content(
#             model=MODEL_ID,
#             contents="Ask a question"
#         )

#         # Run both at once
#         response_1, response_2 = await asyncio.gather(task1, task2)
#         print(response_1.text)
#         print(response_2.text)

# asyncio.run(main())
