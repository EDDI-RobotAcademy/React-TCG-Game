import csv
import json

def convert_csv_to_js(csv_file):
    card_data = []

    with open(csv_file, 'r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            if row['공격력'] == '':
                row['공격력'] = 0

            hp = row.get('체력', None)
            if hp is None or hp.strip() == '':
                hp = None
            else:
                hp = int(hp)

            # Handle the case when '스킬 1' does not exist
            skill_1 = row.get('스킬 1', '')

            # Handle the case when '스킬 2' does not exist
            skill_2 = row.get('스킬 2', '')

            required_energy = row['필요_에너지']
            if required_energy.strip() == '':
                required_energy = 0
            else:
                required_energy = int(required_energy)

            card = {
                '카드명': row['카드명'],
                '종족': row['종족'],
                '등급': row['등급'],
                '종류': row['종류'],
                '카드번호': int(row['카드번호']),
                '병종': row['병종'],
                '필요_에너지': required_energy,
                '공격력': int(row['공격력']),
                '체력': hp,
                '패시브': row['패시브'],
                '스킬': row['스킬'],
                '스킬 개수': int(row['스킬 개수']),
                '스킬 1': skill_1,
                '스킬 2': skill_2,
                '패시브 1': row['패시브 1'],
                '패시브 2': row['패시브 2'],
                '스킬1 데미지': int(row['스킬1 데미지']),
                '스킬2 데미지': int(row['스킬2 데미지']),
                '패시브1 데미지': int(row['패시브1 데미지']),
                '패시브2 데미지': int(row['패시브2 데미지']),
                '스킬1 언데드필요에너지': int(row['스킬1 언데드필요에너지']),
                '스킬1 휴먼필요에너지': int(row['스킬1 휴먼필요에너지']),
                '스킬1 트런트필요에너지': int(row['스킬1 트런트필요에너지']),
                '스킬2 언데드필요에너지': int(row['스킬2 언데드필요에너지']),
                '스킬2 휴먼필요에너지': int(row['스킬2 휴먼필요에너지']),
                '스킬2 트런트필요에너지': int(row['스킬2 트런트필요에너지']),
            }
            card_data.append(card)

    return card_data

def write_js_file(card_data, output_file):
    with open(output_file, 'w') as jsfile:
        jsfile.write("const cardData = ")
        json.dump(card_data, jsfile, ensure_ascii=False, indent=4)
        jsfile.write(";\n\nexport default cardData;")

# CSV 파일에서 데이터 읽기
csv_file = 'data.csv'
card_data = convert_csv_to_js(csv_file)

# JavaScript 파일로 변환하여 저장
output_file = '../../src/common/every_card_info.js'
write_js_file(card_data, output_file)

print(f"Converted CSV file '{csv_file}' to JavaScript file '{output_file}'")
