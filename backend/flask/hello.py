from flask import Flask
app = Flask(__name__)
 
@app.route("/")
def hello():
    return "Call an EFT as part of the route"

options = ['VAW', 'VFH', 'VGT', 'VHT', 'VIS', 'VNQ', 'VPU']

@app.route("/<any({}):segment>".format(str(options)[1:-1]))
def seg(segment):
    return "Training {}!".format(segment)
 
if __name__ == "__main__":
    app.run()
