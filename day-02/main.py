scoreLookupA = {
        'A': {'X': 4, 'Y': 8, 'Z': 3},
        'B': {'X': 1, 'Y': 5, 'Z': 9},
        'C': {'X': 7, 'Y': 2, 'Z': 6},
        }

scoreLookupB = {
        'A': {'X': 3, 'Y': 4, 'Z': 8},
        'B': {'X': 1, 'Y': 5, 'Z': 9},
        'C': {'X': 2, 'Y': 6, 'Z': 7},
        }

with open('input', 'r') as f:
    scoreA = 0
    scoreB = 0
    for line in f:
        scoreA += scoreLookupA[line[0]][line[2]]
        scoreB += scoreLookupB[line[0]][line[2]]
    print(scoreA)
    print(scoreB)
