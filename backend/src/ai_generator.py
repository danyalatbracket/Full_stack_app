import os
import re
import json
from typing import Dict, Any
from dotenv import load_dotenv
from ai21 import AI21Client
from ai21.models.chat.chat_message import SystemMessage, UserMessage


# Load environment variables
load_dotenv()
AI21_API_KEY = os.getenv("AI21_API_KEY") or "a81523b5-5df8-4e67-93d2-79b4654f1985"

# Initialize AI21 client
client = AI21Client(api_key="a81523b5-5df8-4e67-93d2-79b4654f1985")


def generate_challenge_with_ai(difficulty: str):

    system_prompt = """You are an expert coding challenge creator. 
    Your task is to generate a coding question with multiple choice answers.
    The question should be appropriate for the specified difficulty level.
    The coding question should not include any code but the options can have code based on the question.

    For easy questions: Focus on basic syntax, simple operations, or common programming concepts.
    For medium questions: Cover intermediate concepts like data structures, algorithms, or language features.
    For hard questions: Include advanced topics, design patterns, optimization techniques, or complex algorithms.

    Return the challenge in the following JSON structure:
    {
        "title": "The question title",
        "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
        "correct_answer_id": 0, // Index of the correct answer (0-3)
        "explanation": "Detailed explanation of why the correct answer is right"
    }

    Make sure the options are plausible but with only one clearly correct answer.
    """
    try:
        messages = [
            SystemMessage(content=system_prompt, role="system"),
            UserMessage(
                content=f"Generate a {difficulty} difficulty coding challenge.",
                role="user",
            ),
        ]

        response = client.chat.completions.create(
            messages=messages,
            model="jamba-large",
            max_tokens=300,
            temperature=0.7,
            top_p=1.0,
        )
        print("AI21 Response:", response)

        content = response.choices[0].message.content
        clean_content = re.sub(
            r"^```json|```$", "", content.strip(), flags=re.IGNORECASE
        ).strip()

        challenge_data = json.loads(clean_content)

        required_fields = ["title", "options", "correct_answer_id", "explanation"]

        for field in required_fields:
            if field not in challenge_data:
                raise ValueError(f"Missing required field: {field}")

        return challenge_data
    except Exception as e:
        print("AI parsing failed:", e)
        return {
            "title": "Basic Python List Operation",
            "options": [
                "my_list.append(5)",
                "my_list.add(5)",
                "my_list.push(5)",
                "my_list.insert(5)",
            ],
            "correct_answer_id": 0,
            "explanation": "In Python, append() is the correct method to add an element to the end of a list.",
        }
