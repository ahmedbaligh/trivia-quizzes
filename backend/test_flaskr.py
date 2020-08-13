import os
import unittest
import json
from flask_sqlalchemy import SQLAlchemy

from flaskr import create_app
from models import setup_db, Question, Category


class TriviaTestCase(unittest.TestCase):
    """This class represents the trivia test case"""

    def setUp(self):
        """Define test variables and initialize app."""
        self.app = create_app()
        self.client = self.app.test_client
        self.database_name = "trivia_test"
        self.database_path = "postgres://ahmedbaligh:eman@{}/{}".format('localhost:5433', self.database_name)
        setup_db(self.app, self.database_path)

        # binds the app to the current context
        with self.app.app_context():
            self.db = SQLAlchemy()
            self.db.init_app(self.app)
            # create all tables
            self.db.create_all()

        self.new_question = {
            'question': 'How are you?',
            'answer': 'Fine',
            'category': 2,
            'difficulty': 1
        }

    
    def tearDown(self):
        """Executed after reach test"""
        pass

    """
    TODO
    Write at least one test for each test for successful operation and for expected errors.
    """
    # Get Categories
    def test_categories_retrieval(self):
        res = self.client().get('/categories')
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertTrue(data['success'])
        self.assertTrue(len(data['categories']))
        self.assertTrue(data['total_categories'])

    def test_questions_retrieval(self):
        res = self.client().get('/questions')
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertTrue(data['total_questions'])
        self.assertTrue(len(data['questions']))

    def test_404_no_questions_page(self):
        res = self.client().get('/questions?page=100')
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 404)
        self.assertEqual(data['success'], False)
        self.assertEqual(data['message'], 'resource not found')


    # Delete a question
    # def test_question_deletion(self):
    #     res = self.client().delete('/questions/10')
    #     data = json.loads(res.data)

    #     question = Question.query.filter(Question.id == 10).one_or_none()

    #     self.assertEqual(res.status_code, 200)
    #     self.assertEqual(question, None)
    #     self.assertEqual(data['deleted'], 10)
    #     self.assertTrue(data['success'])
    #     self.assertTrue(data['total_questions'])
    #     self.assertTrue(len(data['questions']))

    # Post a question
    # def test_question_creation(self):
    #     res = self.client().post('/questions', json=self.new_question)
    #     data = json.loads(res.data)

    #     self.assertEqual(res.status_code, 200)
    #     self.assertEqual(data['success'], True)

    # Search for a question

    # Get questions by category

    # Quiz

# Make the tests conveniently executable
if __name__ == "__main__":
    unittest.main()