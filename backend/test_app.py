import unittest
from unittest.mock import patch

from backend.app import app


class ContactRouteTests(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()

    @patch("backend.app.send_contact_message")
    def test_contact_route_sends_message(self, mock_send):
        mock_send.return_value = True

        response = self.client.post(
            "/contact",
            json={
                "fullName": "Juan Dela Cruz",
                "email": "juan@example.com",
                "company": "ABC Corp",
                "message": "Hello from the test suite",
            },
        )

        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.get_json()["success"])
        mock_send.assert_called_once_with(
            "Juan Dela Cruz",
            "juan@example.com",
            "ABC Corp",
            "Hello from the test suite",
        )

    def test_contact_route_requires_all_fields(self):
        response = self.client.post(
            "/contact",
            json={
                "fullName": "Juan Dela Cruz",
                "email": "juan@example.com",
                "company": "",
                "message": "Hello",
            },
        )

        self.assertEqual(response.status_code, 400)
        self.assertFalse(response.get_json()["success"])


if __name__ == "__main__":
    unittest.main()
