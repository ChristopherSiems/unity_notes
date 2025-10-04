from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from flask_cors import CORS
from db.models import db_session, NoteManager
import os

# Initialize Flask app
app = Flask(__name__)

CORS(app)


@app.route('/api/notes', methods=['POST'])
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
                return jsonify({'error': 'No data provided'}), 400
            
            note = data.get('note')
            statement = data.get('statement')
            
            if not note or not statement:
                return jsonify({'error': 'Both "note" and "statement" fields are required'}), 400
            
            note_manager = NoteManager(session)
            note_manager.create(note, statement)
            
            return jsonify({
                'message': 'Note created successfully',
                'note': note
            }), 201
            
        except Exception as e:
            session.rollback()
            return jsonify({'error': str(e)}), 500


@app.route('/api/overview/<string:hash_val>', methods=['GET'])
def get_note_by_hash(hash_val):
    """Request a community overview"""
    try:
        #get overview
        pass

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/summary', methods=['POST'])
def add_note():
    """
    Get summary for statement
    Expected JSON body:
    {
        "statement": "Statement to hash"
    }
    """

    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        
        statement = data.get('statement')
        
        #get summary
        
        return jsonify({
            'summary': "default summary"
        }), 201
        
    except Exception as e:

        return jsonify({'error': str(e)}), 500


# Main entry point
if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=5000)