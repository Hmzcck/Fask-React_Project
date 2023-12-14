from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@localhost/myapp_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)  # 'username' yerine 'name' kullanıldı
    password = db.Column(db.String(50), nullable=False)
    phoneNumber = db.Column(db.String(15), nullable=False)
    image = db.Column(db.String(255), nullable=True)

    # Model nesnesini dictionary'e çeviren yardımcı fonksiyon
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'password': self.password,
            'phoneNumber': self.phoneNumber,
            'image': self.image
        }


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(name=data['name'], password=data['password']).first()
    if user:
        return {'success': True}
    return {'success': False}

@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

@app.route('/users', methods=['POST'])
def add_user():
    data = request.get_json()
    new_user = User(name=data['name'], password=data['password'], phoneNumber=data['phoneNumber'], image=data['image'])
    db.session.add(new_user)
    db.session.commit()
    return {'success': True}

@app.route('/users/search', methods=['GET'])
def find_user():
    name = request.args.get('name')
    user = User.query.filter_by(name=name).first()
    if user:
        return user.to_dict()
    return {'message': 'User not found'}, 404

@app.route('/users/update', methods=['POST'])
def update_user():
    data = request.get_json()
    user = User.query.filter_by(name=data['name']).first()
    if user:
        user.name = data['newUsername']
        user.phoneNumber = data['newPhoneNumber']
        db.session.commit()
        return {'success': True}
    return {'success': False}

@app.route('/users/delete', methods=['POST'])
def delete_user():
    data = request.get_json()
    user = User.query.filter_by(name=data['name']).first()
    if user:
        db.session.delete(user)
        db.session.commit()
        users = User.query.all()
        return jsonify([user.to_dict() for user in users])
    return {'success': False}

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  
    app.run()
