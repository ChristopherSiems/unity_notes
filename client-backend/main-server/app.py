import os

from db.models import NoteManager, db_session
from socket_util.manager import SocketManager
from aggregation import AggregationAgent
from flask import (Flask, flash, jsonify, redirect, render_template, request,
                   url_for)
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)

CORS(app)


@app.route("/api/notes", methods=["POST"])
def add_note():
    """
    Add a new note
    Expected JSON body:
    {
        "note": "Your note content",
        "statement": "Statement to hash"
    }
    """
    with db_session() as session:
        try:
            data = request.get_json()

            if not data:
                return jsonify({"error": "No data provided"}), 400

            note = data.get("note")
            statement = data.get("statement")

            if not note or not statement:
                return (
                    jsonify(
                        {"error": 'Both "note" and "statement" fields are required'}
                    ),
                    400,
                )

            note_manager = NoteManager(session)
            note_manager.create(note, statement)
            SocketManager.add_statement_to_central(statement)
            

            return jsonify({"message": "Note created successfully", "note": note}), 201

        except Exception as e:
            session.rollback()
            return jsonify({"error": str(e)}), 500


@app.route("/api/note/<string:hash_val>", methods=["GET"])
def get_note_by_hash(hash_val):
    """Get all notes for a given hash"""
    try:
        with db_session() as session:
            note_manager = NoteManager(session)
            notes = note_manager.get_notes_by_hash(hash_val)

            notes_list = [n.note for n in notes]


        return jsonify({"notes": notes_list}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/summary", methods=["POST"])
async def get_summary():
    """
    Get summary for statement
    Expected JSON body:
    {
        "statement": "Statement to search"
    }
    """

    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "No data provided"}), 400

        statement = data.get("statement")
        socket_manager = SocketManager()
        
        notes = await socket_manager.get_notes(statement)
        aggregator = AggregationAgent()
        summary = aggregator.summarize(notes, statement, max_size=7, output_size=50)
        
        print("yabayda", summary)
        

        # get summary

        return jsonify({"summary": summary}), 201

    except Exception as e:

        return jsonify({"error": str(e)}), 500


# Main entry point
if __name__ == "__main__":
    app.run(debug=True, host="localhost", port=5000)
