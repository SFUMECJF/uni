from prefix import prefix_search

def test_prefix_match_char():
    #Tests for a matching char
    assert prefix_search({"ac": 1, "ba": 2, "ab": 3}, "a") == { "ac": 1, "ab": 3}

def test_match_string():
    #Tests for a matching string
    assert prefix_search({"category": "math", "cat": "animal"}, "cat") == {"category": "math", "cat": "animal"}
    pass

def test_prefix_match_sentence():
    #Tests for a matching sentence string
    assert prefix_search({"category two": "math", "cat is mine": "pet"}, "category two") == {"category two": "math"}
    pass
def test_prefix_match_symbol():
    #Test for a matching symbol
    assert prefix_search({"!": "YES!", "?": "I DONT KNOW"}, "!") == {"!": "YES!"}
    pass

def test_prefix_noMatch_char():
    #Tests for a non-matching char
    assert prefix_search({"ac": 1, "ba": 2, "ab": 3}, "c") == {}
    pass

def test_prefix_noMatch_string():
    #Tests for a non-matching string
    assert prefix_search({"category": "math", "cat": "animal"}, "bat") == {}
    pass

def test_prefix_noMatch_sentence():
    #Tests for a non-matching sentence
    assert prefix_search({"category two": "math", "cat is mine": "pet"}, "categgory two") == {}
    pass

def test_prefix_noMatch_symbol():
    #Tests for a non-matching symbol
    assert prefix_search({"!": "YES!", "?": "I DONT KNOW"}, "*") == {} 
    pass