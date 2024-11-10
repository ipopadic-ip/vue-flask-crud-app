import flask
from flask import Flask
from flaskext.mysql import MySQL
import pymysql

app = Flask(__name__, static_url_path="/")
mysql = MySQL(app, cursorclass=pymysql.cursors.DictCursor)

app.config["MYSQL_DATABASE_USER"] = "***"
app.config["MYSQL_DATABASE_PASSWORD"] = "***"
app.config["MYSQL_DATABASE_DB"] = "prodavnica"

app.secret_key = "neki tekst"


@app.route("/api/kupci", methods=["GET"])
def dobavljanje_svih_kupaca():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM kupac")
    kupci = cursor.fetchall()
    return flask.jsonify(kupci)

@app.route("/api/kupci/<id_kupca>", methods=["GET"])
def dobavljanje_kupaca(id_kupca):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM kupac WHERE id = %s", (id_kupca,))
    kupac = cursor.fetchone()
    if kupac is None:
        return flask.jsonify(None), 404
    return flask.jsonify(kupac)

@app.route("/api/kupci", methods=["POST"])
def dodaj_kupca():
    db = mysql.get_db()
    cursor = db.cursor()
    dokument = flask.request.json
    cursor.execute("INSERT INTO kupac(ime, prezime, adresa) VALUES(%(ime)s, %(prezime)s, %(adresa)s)", dokument)
    db.commit()
    return flask.jsonify(dokument), 201

@app.route("/api/kupci/<id_kupca>", methods=["DELETE"])
def uklanjanje_kupca(id_kupca):
    db = mysql.get_db()
    cursor = db.cursor()
    obrisani = cursor.execute("DELETE FROM kupac WHERE id = %s", (id_kupca,))
    db.commit()
    if obrisani == 0:
        return flask.jsonify(None), 404
    return flask.jsonify(None), 200

@app.route("/api/kupci/<id_kupca>", methods=["PUT"])
def izmena_kupca(id_kupca):
    db = mysql.get_db()
    cursor = db.cursor()
    dokument = dict(flask.request.json)
    dokument["id_kupca"] = id_kupca
    izmenjeni = cursor.execute("UPDATE kupac SET ime=%(ime)s, prezime=%(prezime)s, adresa=%(adresa)s WHERE id = %(id_kupca)s", dokument)
    db.commit()
    if izmenjeni == 0:
        return flask.jsonify(None), 404
    return flask.jsonify(dokument), 200


# -------------------- proizvodi -----------------

@app.route("/api/kupci", methods=["GET"])
def doavljanje_kupaca_za_proizvod():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM kupac")
    kupci = cursor.fetchall()
    return flask.jsonify(kupci)

@app.route("/api/proizvodi", methods=["GET"])
def dobavljanje_svih_proizvoda():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM proizvod, kupac WHERE proizvod.kupac_id = kupac.id")
    proizvodi = cursor.fetchall()
    for s in proizvodi:
        del s["kupac.id"]
        s["kupac"] = {
            "id": s["kupac_id"],
            "sifra": s["ime"],
            "naziv": s["prezime"],
            "adresa": s["adresa"]
        }
        del s["ime"]
        del s["prezime"]
        del s["adresa"]
        del s["kupac_id"]
    return flask.jsonify(proizvodi)

@app.route("/api/proizvodi/<id_proizvoda>", methods=["GET"])
def dobavljanje_proizvoda(id_proizvoda):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM proizvod WHERE id = %s", (id_proizvoda,))
    proizvod = cursor.fetchone()
    if proizvod is None:
        return flask.jsonify(None), 404
    return flask.jsonify(proizvod)

@app.route("/api/proizvodi", methods=["POST"])
def dodaj_proizvod():
    db = mysql.get_db()
    cursor = db.cursor()
    dokument = flask.request.json
    cursor.execute("INSERT INTO proizvod(naziv, opis, cena, kolicina, datum_kupovine) VALUES(%(naziv)s, %(opis)s, %(cena)s, %(kolicina)s, %(datum_kupovine)s)", dokument)
    db.commit()
    return flask.jsonify(dokument), 201

@app.route("/api/proizvodi/<id_proizvoda>", methods=["DELETE"])
def uklanjanje_proizvoda(id_proizvoda):
    db = mysql.get_db()
    cursor = db.cursor()
    obrisani = cursor.execute("DELETE FROM proizvod WHERE id = %s", (id_proizvoda,))
    db.commit()
    if obrisani == 0:
        return flask.jsonify(None), 404
    return flask.jsonify(None), 200

@app.route("/api/proizvodi/<id_proizvoda>", methods=["PUT"])
def izmena_proizvoda(id_proizvoda):
    db = mysql.get_db()
    cursor = db.cursor()
    dokument = dict(flask.request.json)
    dokument["id_proizvoda"] = id_proizvoda
    izmenjeni = cursor.execute("UPDATE proizvod SET naziv=%(naziv)s, opis=%(opis)s, cena=%(cena)s, kolicina=%(kolicina)s, datum_kupovine=%(datum_kupovine)s, kupac_id=%(kupac_id)s WHERE id = %(id_proizvoda)s", dokument)
    db.commit()
    if izmenjeni == 0:
        return flask.jsonify(None), 404
    return flask.jsonify(dokument), 200

@app.route("/")
def home():
    return app.send_static_file("index.html")

if __name__ == "__main__":
    app.run()
