def inverse(d):
    '''
    Given a dictionary d, invert its structure such that values in d map to lists of keys in d. For example:
    >>> inverse({1: 'A', 2: 'B', 3: 'A'})
    {'A': [1, 3], 'B': [2]}
    '''

    """
    keys = []
    new_dict = {}
    for key in d:
        if d[key] in keys:
            new_dict[key].append[key]
        else:
            keys.append(key)
    """
    inv_map = {}
    for k, v in d.items():
        inv_map[v] = inv_map.get(v, [])
        inv_map[v].append(k)

    return inv_map
