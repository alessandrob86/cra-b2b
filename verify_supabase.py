import requests

token = "sbp_26ff587a6baa4dd9cdeae2e9b46e1663b66f40f3"
project_id = "bzykubcffktgmnhkijol"

headers = {
    "Authorization": f"Bearer {token}",
}

print(f"Checking projects for token...")
response = requests.get("https://api.supabase.com/v1/projects", headers=headers)

if response.status_code == 200:
    projects = response.json()
    print(f"Success! Found {len(projects)} projects.")
    for p in projects:
        print(f" - {p['name']} ({p['id']})")
        if p['id'] == project_id:
            print(f"!!! PROJECT MATCH FOUND !!!")
else:
    print(f"Error: {response.status_code}")
    print(response.text)
