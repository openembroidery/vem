
# pip install lxml svgpathtools

from lxml import etree
from svgpathtools import parse_path, bbox2path
import math

def get_bbox_of_path(path_element):
    # Mengambil atribut 'd' dari elemen path
    d_attr = path_element.attrib['d']
    # Parsing path menggunakan svgpathtools
    path = parse_path(d_attr)
    # Mendapatkan bounding box
    min_x, max_x,  min_y, max_y = path.bbox()

    min_x *= 3.779528
    min_y *= 3.779528
    max_x *= 3.779528
    max_y *= 3.779528
    print (min_x, min_y, max_x, max_y)
    # Pembulatan
    min_x = math.floor(min_x)
    min_y = math.floor(min_y)
    max_x = math.ceil(round(max_x,3))
    max_y = math.ceil(round(max_y,3))
    return min_x, min_y, max_x, max_y

def find_paths_in_layer(svg_file, layer_name, path_names):
    tree = etree.parse(svg_file)
    root = tree.getroot()

    ns = {
        'svg': 'http://www.w3.org/2000/svg',
        'inkscape': 'http://www.inkscape.org/namespaces/inkscape'
    }

    # Mencari layer dengan nama tertentu
    layer = root.xpath(f"//svg:g[@inkscape:label='{layer_name}']", namespaces=ns)
    if not layer:
        return {}

    layer = layer[0]
    results = {}

    for path_name in path_names:
        # Mencari path di dalam layer dengan id tertentu
        path_element = layer.xpath(f".//svg:path[@inkscape:label='{path_name}']", namespaces=ns)
        if path_element:
            path_element = path_element[0]
            min_x, min_y, max_x, max_y = get_bbox_of_path(path_element)
            width = max_x - min_x
            height = max_y - min_y

            results[path_name] = (min_x, min_y, width, height)
    
    return results

# Contoh penggunaan
hoops = {}
svg_file = 'ALL-HOOPS-px.svg'  # Ganti dengan path ke file SVG kamu
import os
svg_file = os.path.join(os.path.dirname(__file__), svg_file)
for size in 'small medium large'.split(' '):
    hoops[size] = part = {}
    path_names = [
        '%s-inner' % size, 
        '%s-outer' % size, 
        'workarea']
    bounding_boxes = find_paths_in_layer(svg_file, size, path_names)

    for path_name, bbox in bounding_boxes.items():
        name = path_name.split('-')[-1]
        part[name] = list(bbox)
        print(f"Path '{path_name}' memiliki bounding box: {bbox}")

import json
s = json.dumps(hoops, indent=4)
print(s)