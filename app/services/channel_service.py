import random


def simulate_send(channel):

    outcomes = [
        "delivered",
        "opened",
        "clicked"
    ]

    return random.choice(
        outcomes
    )