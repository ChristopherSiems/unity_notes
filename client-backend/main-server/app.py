from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from flask_cors import CORS
import os

# Initialize Flask app
app = Flask(__name__)

CORS(app)



# Route: Handle GET and POST requests
@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        message = request.form.get('message')
        
        # Process form data here
        flash(f'Thank you {name}, your message has been received!', 'success')
        return redirect(url_for('index'))
    
    return render_template('contact.html', title='Contact')

# Route: API endpoint example
@app.route('/api/data')
def api_data():
    data = {
        'status': 'success',
        'message': 'This is a sample API endpoint',
        'data': [1, 2, 3, 4, 5]
    }
    return jsonify(data)

# Route: Dynamic URL parameters
@app.route('/user/<username>')
def user_profile(username):
    return render_template('profile.html', username=username, title=f'{username} Profile')


# Before request handler
@app.before_request
def before_request():
    # Code to run before each request
    pass

# After request handler
@app.after_request
def after_request(response):
    # Code to run after each request
    return response

# Main entry point
if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=5000)