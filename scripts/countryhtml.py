# Name: Kimberley Boersma
# Student no: 11003464
# Python file to write some html lines to txt file

def make_html(country_list):
	# Writes html lines to txt file for every country in list
	# So I don't have to manually type it in html :-)

	filepath = 'D:/Documents/Minor Programmeren/project/data/country_list_html.txt'
	with open(filepath, 'a') as country_list_html:
		for country in country_list:
			line = '<a class="dropdown-item" value="'+country+'" href="#line">'+country+'</a>\n'
			country_list_html.write(line)

# Execute with ctrl + enter
make_html(all_countries)

# List of countries acquired from data
countries = {0: "Afghanistan",
1: "Albania",
2: "Algeria",
3: "Angola",
4: "Argentina",
5: "Austria",
6: "Bangladesh",
7: "Belgium",
8: "Bolivia",
9: "Botswana",
10: "Brazil",
11: "Bulgaria",
12: "Cambodia",
13: "Chile",
14: "China",
15: "Colombia",
16: "Costa Rica",
17: "Cyprus",
18: "Czechoslovakia",
19: "Djibouti",
20: "Dominican Republic",
21: "East Germany (GDR)",
22: "Ecuador",
23: "Egypt",
24: "El Salvador",
25: "Ethiopia",
26: "France",
27: "Germany",
28: "Greece",
29: "Guatemala",
30: "Guyana",
31: "Haiti",
32: "Honduras",
33: "Hong Kong",
34: "India",
35: "Indonesia",
36: "Iran",
37: "Ireland",
38: "Israel",
39: "Italy",
40: "Japan",
41: "Jordan",
42: "Laos",
43: "Lebanon",
44: "Liberia",
45: "Malaysia",
46: "Mali",
47: "Mexico",
48: "Mozambique",
49: "Myanmar",
50: "Namibia",
51: "Netherlands",
52: "Nicaragua",
53: "Pakistan",
54: "Panama",
55: "Papua New Guinea",
56: "Peru",
57: "Philippines",
58: "Poland",
59: "Republic of the Congo",
60: "Senegal",
61: "Somalia",
62: "South Africa",
63: "South Korea",
64: "Soviet Union",
65: "Spain",
66: "Sri Lanka",
67: "Sudan",
68: "Suriname",
69: "Sweden",
70: "Switzerland",
71: "Taiwan",
72: "Thailand",
73: "Turkey",
74: "Uganda",
75: "United Kingdom",
76: "United States",
77: "Uruguay",
78: "Venezuela",
79: "West Bank and Gaza Strip",
80: "West Germany (FRG)",
81: "Yugoslavia",
82: "Zambia",
83: "Zimbabwe",
84: "Armenia",
85: "Australia",
86: "Azerbaijan",
87: "Bahrain",
88: "Belize",
89: "Burkina Faso",
90: "Burundi",
91: "Cameroon",
92: "Central African Republic",
93: "Chad",
94: "Croatia",
95: "Cuba",
96: "Denmark",
97: "Fiji",
98: "Georgia",
99: "Guadeloupe",
100: "Hungary",
101: "Iraq",
102: "Jamaica",
103: "Kenya",
104: "Kuwait",
105: "Lithuania",
106: "Madagascar",
107: "Martinique",
108: "Moldova",
109: "Morocco",
110: "Nepal",
111: "New Zealand",
112: "Niger",
113: "Nigeria",
114: "Norway",
115: "Romania",
116: "Rwanda",
117: "Saudi Arabia",
118: "Sierra Leone",
119: "Singapore",
120: "Swaziland",
121: "Togo",
122: "Trinidad and Tobago",
123: "Tunisia",
124: "Ukraine",
125: "Yemen",
126: "Zaire",
127: "Antigua and Barbuda",
128: "Barbados",
129: "Benin",
130: "Bosnia-Herzegovina",
131: "Brunei",
132: "Canada",
133: "Comoros",
134: "Equatorial Guinea",
135: "Estonia",
136: "Finland",
137: "Ghana",
138: "Guinea",
139: "Ivory Coast",
140: "Kazakhstan",
141: "Latvia",
142: "Libya",
143: "Malawi",
144: "Malta",
145: "New Caledonia",
146: "Paraguay",
147: "Portugal",
148: "Russia",
149: "Tajikistan",
150: "United Arab Emirates",
151: "Uzbekistan",
152: "Vietnam",
153: "Western Sahara",
154: "Belarus",
155: "Czech Republic",
156: "Gabon",
157: "Gambia",
158: "Lesotho",
159: "Luxembourg",
160: "Macedonia",
161: "North Korea",
162: "Slovak Republic",
163: "Slovenia",
164: "Tanzania",
165: "Wallis and Futuna",
166: "Eritrea",
167: "French Polynesia",
168: "Macau",
169: "St. Kitts and Nevis",
170: "French Guiana",
171: "Kyrgyzstan",
172: "Mauritania",
173: "Qatar",
174: "Syria",
175: "Vanuatu",
176: "Bahamas",
177: "Democratic Republic of the Congo",
178: "Dominica",
179: "Kosovo",
180: "Solomon Islands",
181: "East Timor",
182: "St. Lucia",
183: "Guinea-Bissau",
184: "Montenegro",
186: "Turkmenistan",
187: "Serbia-Montenegro",
188: "Bhutan",
189: "Maldives",
190: "Serbia",
191: "Iceland",
192: "South Sudan"}

# Convert to list and sort alphabetically
all_countries = list(sorted(countries.values()))
