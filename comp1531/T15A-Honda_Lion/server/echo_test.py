''' echo_test.py '''

import echo

# pylint: disable = C0116, C0303
# (missing function or method docstring)

# Tests:
# mostly normal cases, if a statement is returned correctly


def test_echo():
    assert echo.echo("1") == "1", "1 == 1"
    assert echo.echo("abc") == "abc", "abc == abc"
    assert echo.echo("trump") == "trump", "trump == trump"
