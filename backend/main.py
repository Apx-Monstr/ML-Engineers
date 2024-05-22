import pandas as pd
from flask import Flask, jsonify, request
# from flask_cors import cross_origin
from flask_cors import cross_origin
app = Flask(__name__)

URL= "data/salaries.csv"

data = pd.read_csv(URL)

# print(data.describe())
# print(data.keys())
# print(data.groupby("work_year").agg(total_jobs = ("job_title", "count"), average_salary=('salary_in_usd', 'mean')).reset_index())
# print(data["job_title"])
# print(data.groupby("job_title").agg(total_jobs = ("job_title", "count"), average_salary = ('salary_in_usd', 'mean')))
# print(data)

@app.route("/maintable", methods = ["GET"])
@cross_origin()
def getMainTable():
    mainT = data.groupby('work_year').agg(
        total_jobs = ("job_title", "count"),
        avgSalary = ("salary_in_usd", "mean")
    ).reset_index()
    print(request.args)
    print(request.args.get('sortby'))
    print(request.args.get('orderby'))
    return jsonify(mainT.to_dict(orient='records'))

@app.route("/jobTitles/<int:year>", methods = ["GET"])
@cross_origin()
def get_job_titles(year):
    if year not in data['work_year'].unique():
        return jsonify({'error': 'Year not found'}), 404
    filtered_data = data[data['work_year'] == year]
    job_titles = filtered_data['job_title'].value_counts().reset_index()
    job_titles.columns = ['job_title', 'count']
    return jsonify(job_titles.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True)