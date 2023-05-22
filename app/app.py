from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf

model = tf.keras.models.load_model('app/model')

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    """Endpoint for prediction"""
    text = request.json['text']
    items_to_remove = ["\n", "|", "'"]
    for item in items_to_remove:
        text = text.replace(item, "")
    prediction = model.predict([text])
    if prediction[0][0] > 0.5:
        return jsonify({'prediction': 'ChatGPT', 'score': float(prediction[0][0])})
    else:
        return jsonify({'prediction': 'Human', 'score': float(1 - prediction[0][0])})

if __name__ == "__main__":
    app.run(debug=True)
