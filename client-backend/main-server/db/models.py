from sqlalchemy import create_engine, Column, String, Integer
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from xxhash import xxh64_intdigest
from contextlib import contextmanager

# Create base class for declarative models
Base = declarative_base()


# Define the Notes model
#**handle duplicates later
class Notes(Base):
    __tablename__ = 'notes'
    id = Column(Integer, primary_key=True, autoincrement=True)
    hash = Column(String, nullable=False)
    note = Column(String, nullable=False)
    
    def __repr__(self):
        return f"<Note(hash='{self.hash}', note='{self.note[:50]}...')>"

class NoteManager: 
    def __init__(self, session) -> None:
        self.session = session
    
    def create(self, note:str, statement: str) -> None:
        hash_val = str(xxh64_intdigest(statement))
        note = Notes(hash = hash_val, note = note)
        self.session.add(note)
        self.session.commit()

    def get_notes_by_hash(self, hash_v:str) -> list:
        """Return all notes that match the hash of the given statement."""
        return self.session.query(Notes).filter_by(hash=hash_v).all()



# Database initialization
def init_db(db_path='notes.db'):

    # Create engine
    engine = create_engine(f'sqlite:///{db_path}', echo=True)
    # Create all tables
    Base.metadata.create_all(engine)
        
        
engine = create_engine(f'sqlite:///notes.db', echo=True) 


#session management 
@contextmanager
def db_session():
    SessionFactory = sessionmaker(bind=engine)
    session = SessionFactory()
    try:
        yield session
        session.commit()
    except:
        session.rollback()
        raise
    finally:
        session.close()


if __name__ == "__main__":
    init_db()
    with db_session() as session: 
        
        NoteManager(session = session).create('the earth is flat', 'it is not flat')
    