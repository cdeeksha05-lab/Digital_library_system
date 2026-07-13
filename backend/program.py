from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pymysql

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

connection = pymysql.connect(
    host = "localhost",
    user = "root",
    password = "root",
    database = "DigitalLibrary"
)


@app.get("/register")
def register(
    name: str,
    email: str,
    phone: str,
    username: str,
    password: str
):

    cursor = connection.cursor()

    # Check if username already exists
    sql = "SELECT * FROM login_users WHERE username=%s"

    cursor.execute(sql, (username,))

    user = cursor.fetchone()

    if user:

        cursor.close()

        return {
            "message": "Username already exists"
        }

    sql = """
    INSERT INTO login_users
    (name,email,phone,username,password)
    VALUES(%s,%s,%s,%s,%s)
    """

    cursor.execute(sql, (

        name,
        email,
        phone,
        username,
        password

    ))

    connection.commit()

    cursor.close()

    return {
        "message":"Registration Successful"
    }


@app.get("/login")
def login(

    username: str,
    password: str

):

    cursor = connection.cursor()

    sql = """
    SELECT * FROM login_users
    WHERE username=%s
    AND password=%s
    """

    cursor.execute(sql, (

        username,
        password

    ))

    user = cursor.fetchone()

    cursor.close()

    if user:

        return {

            "status":"success",

            "message":"Login Successful"

        }

    return {

        "status":"failed",

        "message":"Invalid Username or Password"

    }

@app.get("/dashboard")
def dashboard():

    cursor = connection.cursor()

    # Authors
    cursor.execute("SELECT COUNT(*) FROM authors")
    authors = cursor.fetchone()[0]

    # Books
    cursor.execute("SELECT COUNT(*) FROM books")
    books = cursor.fetchone()[0]

    # Users
    cursor.execute("SELECT COUNT(*) FROM users")
    users = cursor.fetchone()[0]

    # Publishers
    cursor.execute("SELECT COUNT(*) FROM publishers")
    publishers = cursor.fetchone()[0]

    # Genres
    cursor.execute("SELECT COUNT(*) FROM genres")
    genres = cursor.fetchone()[0]

    # Book Genres
    cursor.execute("SELECT COUNT(*) FROM bookgenres")
    bookgenres = cursor.fetchone()[0]

    # Loans
    cursor.execute("SELECT COUNT(*) FROM loans")
    loans = cursor.fetchone()[0]

    # Reservations
    cursor.execute("SELECT COUNT(*) FROM reservations")
    reservations = cursor.fetchone()[0]

    # Reviews
    cursor.execute("SELECT COUNT(*) FROM reviews")
    reviews = cursor.fetchone()[0]

    # Fines
    cursor.execute("SELECT COUNT(*) FROM fines")
    fines = cursor.fetchone()[0]

    cursor.close()

    return {
        "authors": authors,
        "books": books,
        "users": users,
        "publishers": publishers,
        "genres": genres,
        "bookgenres": bookgenres,
        "loans": loans,
        "reservations": reservations,
        "reviews": reviews,
        "fines": fines
    }

@app.get("/authors")
def get_authors():
    cursor = connection.cursor()
    SQL = "SELECT * FROM authors"
    cursor.execute(SQL)
    rows = cursor.fetchall()
    authors = []
    for row in rows:
        authors.append({
            "author_id": row[0],
            "author_name": row[1],
            "country": row[2],
            "birth_year": row[3]
        })
    cursor.close()
    return authors


@app.get("/authors_search")
def search_authors(author_id: int):

    cursor = connection.cursor()

    sql = "SELECT * FROM authors WHERE author_id = %s"

    cursor.execute(sql, (author_id,))

    row = cursor.fetchone()

    cursor.close()

    if row:
        return {"author_id": row[0],
        "author_name": row[1],
        "country": row[2],
        "birth_year": row[3]
    }


    return {"message": "Author Not Found"}


@app.get("/authors_add")
def add_author(
    author_id: int,
    author_name: str,
    country: str,
    birth_year: int
):
    cursor = connection.cursor()

    sql = """
    INSERT INTO authors(author_id, author_name, country, birth_year)
    VALUES(%s, %s, %s, %s)
    """

    cursor.execute(sql, (author_id, author_name, country, birth_year))

    connection.commit()

    cursor.close()

    return {"message": "Author Added Successfully"}



@app.get("/authors_update")
def update_author(
    author_id: int,
    author_name: str,
    country: str,
    birth_year: int
):

    cursor = connection.cursor()

    sql = """
    UPDATE authors
    SET
        author_name=%s,
        country=%s,
        birth_year=%s
    WHERE author_id=%s
    """

    cursor.execute(sql, (
        author_name,
        country,
        birth_year,
        author_id
    ))

    connection.commit()

    if cursor.rowcount > 0:
        message = {"message": "Author Updated Successfully"}
    else:
        message = {"message": "Author Not Found"}

    cursor.close()

    return message



@app.get("/authors_delete")
def delete_author(author_id: int):

    cursor = connection.cursor()

    sql = "DELETE FROM authors WHERE author_id=%s"

    cursor.execute(sql, (author_id,))
    connection.commit()

    if cursor.rowcount > 0:
        message = {"message": "Author Deleted Successfully"}
    else:
        message = {"message": "Author Not Found"}

    cursor.close()

    return message



@app.get("/authors_patch")
def patch_author(
    author_id: int,
    author_name: str,
    country: str,
    birth_year: int
):

    cursor = connection.cursor()

    sql = """
    UPDATE authors
    SET
        author_name = %s,
        country = %s,
        birth_year = %s
    WHERE author_id = %s
    """

    cursor.execute(sql, (
        author_name,
        country,
        birth_year,
        author_id
    ))

    connection.commit()

    if cursor.rowcount > 0:
        message = {"message": "Author Patched Successfully"}
    else:
        message = {"message": "Author Not Found"}

    cursor.close()

    return message



@app.get("/bookgenres")
def get_bookgenres():
    cursor = connection.cursor()
    SQL = "SELECT * FROM bookgenres"
    cursor.execute(SQL)
    rows = cursor.fetchall()
    bookgenres = []
    for row in rows:
        bookgenres.append({
            "bookgenre_id": row[0],
            "book_id": row[1],
            "genre_id": row[2]
        })
    cursor.close()
    return bookgenres


@app.get("/bookgenres_search")
def search_bookgenre(bookgenre_id: int):

    cursor = connection.cursor()

    sql = "SELECT * FROM bookgenres WHERE bookgenre_id = %s"

    cursor.execute(sql, (bookgenre_id,))

    row = cursor.fetchone()

    cursor.close()

    if row:
        return {"bookgenre_id": row[0],
        "book_id": row[1],
        "genre_id": row[2]
    }


    return {"message": "bookgenre Not Found"}



@app.get("/bookgenres_add")
def add_bookgenre(
    bookgenre_id: int,
    book_id: int,
    genre_id: int
):

    cursor = connection.cursor()

    sql = """
    INSERT INTO bookgenres(bookgenre_id, book_id, genre_id)
    VALUES(%s, %s, %s)
    """

    cursor.execute(sql, (bookgenre_id, book_id, genre_id))

    connection.commit()

    cursor.close()

    return {"message": "Bookgenre Added Successfully"}



@app.get("/bookgenres_update")
def update_bookgenre(
    bookgenre_id: int,
    book_id: int,
    genre_id: int
):

    cursor = connection.cursor()

    sql = """
    UPDATE bookgenres
    SET
        book_id = %s,
        genre_id = %s
    WHERE
        bookgenre_id = %s
    """

    cursor.execute(sql, (
        book_id,
        genre_id,
        bookgenre_id
    ))

    connection.commit()

    if cursor.rowcount > 0:
        message = {"message": "Bookgenre Updated Successfully"}
    else:
        message = {"message": "Bookgenre Not Found"}

    cursor.close()

    return message



@app.get("/bookgenres_delete")
def delete_bookgenre(bookgenre_id: int):

    cursor = connection.cursor()

    sql = "DELETE FROM bookgenres WHERE bookgenre_id=%s"

    cursor.execute(sql, (bookgenre_id,))
    connection.commit()

    if cursor.rowcount > 0:
        message = {"message": "bookgenre Deleted Successfully"}
    else:
        message = {"message": "bookgenre Not Found"}

    cursor.close()

    return message


@app.get("/bookgenres_patch")
def patch_bookgenre(
        bookgenre_id: int,
        book_id: int,
        genre_id: int
):
    cursor = connection.cursor()

    sql = """
    UPDATE bookgenres
    SET
        book_id = %s,
        genre_id = %s

    WHERE bookgenre_id = %s
    """

    cursor.execute(sql, (
        book_id,
        genre_id,
        bookgenre_id
    ))

    connection.commit()

    if cursor.rowcount > 0:
        message = {"message": "genrebook Patched Successfully"}
    else:
        message = {"message": "genrebook Not Found"}

    cursor.close()

    return message



@app.get("/books")
def get_books():
    cursor = connection.cursor()
    SQL = "SELECT * FROM books"
    cursor.execute(SQL)
    rows = cursor.fetchall()
    books = []
    for row in rows:
        books.append({
            "book_id": row[0],
            "title": row[1],
            "author_id": row[2],
            "publisher_id": row[3],
            "publication_year": row[4],
            "price": row[5]
        })
    cursor.close()
    return books


@app.get("/books_search")
def search_books(book_id: int):

    cursor = connection.cursor()

    sql = "SELECT * FROM books WHERE book_id = %s"

    cursor.execute(sql, (book_id,))

    row = cursor.fetchone()

    cursor.close()

    if row:
        return {"book_id": row[0],
        "title": row[1],
        "author_id": row[2],
        "publisher_id": row[3],
        "publication_year": row[4],
        "price": row[5]
    }


    return {"message": "books Not Found"}



@app.get("/books_add")
def add_books(
    book_id: int,
    title: str,
    author_id: int,
    publisher_id: int,
    publication_year: int,
    price: float
):

    cursor = connection.cursor()

    sql = """
    INSERT INTO books(book_id, title, author_id, publisher_id, publication_year, price)
    VALUES(%s, %s, %s, %s, %s, %s)
    """

    cursor.execute(sql, (book_id, title, author_id, publisher_id, publication_year, price))

    connection.commit()

    cursor.close()

    return {"message": "Books Added Successfully"}



@app.get("/books_update")
def update_books(
    book_id: int,
    title: str,
    author_id: int,
    publisher_id: int,
    publication_year: int,
    price: float
):

    cursor = connection.cursor()

    sql = """
    UPDATE books
    SET
        title = %s,
        author_id = %s,
        publisher_id = %s,
        publication_year = %s,
        price = %s
    WHERE
        book_id = %s
    """

    cursor.execute(sql, (
        title,
        author_id,
        publisher_id,
        publication_year,
        price,
        book_id
    ))

    connection.commit()

    if cursor.rowcount > 0:
        message = {"message": "Books Updated Successfully"}
    else:
        message = {"message": "Books Not Found"}

    cursor.close()

    return message



@app.get("/books_delete")
def delete_books(book_id: int):

    cursor = connection.cursor()

    sql = "DELETE FROM books WHERE book_id=%s"

    cursor.execute(sql, (book_id,))
    connection.commit()

    if cursor.rowcount > 0:
        message = {"message": "books Deleted Successfully"}
    else:
        message = {"message": "books Not Found"}

    cursor.close()

    return message



@app.get("/books_patch")
def patch_books(
        book_id: int,
        title: str,
        author_id: int,
        publisher_id: int,
        publication_year: int,
        price: float
):
    cursor = connection.cursor()

    sql = """
    UPDATE books
    SET
        title = %s,
        author_id = %s,
        publisher_id = %s,
        publication_year = %s,
        price = %s

    WHERE book_id = %s
    """

    cursor.execute(sql, (
        title,
        author_id,
        publisher_id,
        publication_year,
        price,
        book_id
    ))

    connection.commit()

    if cursor.rowcount > 0:
        message = {"message": "books Patched Successfully"}
    else:
        message = {"message": "books Not Found"}

    cursor.close()

    return message


@app.get("/fines")
def get_fines():
    cursor = connection.cursor()
    SQL = "SELECT * FROM fines"
    cursor.execute(SQL)
    rows = cursor.fetchall()
    fines = []
    for row in rows:
        fines.append({
            "fine_id": row[0],
            "loan_id": row[1],
            "amount": row[2],
            "paid_status": row[3]
        })
    cursor.close()
    return fines



@app.get("/fines_search")
def search_fines(fine_id: int):

    cursor = connection.cursor()

    sql = "SELECT * FROM fines WHERE fine_id = %s"

    cursor.execute(sql, (fine_id,))

    row = cursor.fetchone()

    cursor.close()

    if row:
        return {"fine_id": row[0],
        "loan_id": row[1],
        "amount": row[2],
        "paid_status": row[3]
    }


    return {"message": "Fines Not Found"}



@app.get("/fines_add")
def add_fines(
    fine_id: int,
    loan_id: int,
    amount: int,
    paid_status: str
):
    cursor = connection.cursor()

    sql = """
    INSERT INTO fines (fine_id, loan_id, amount, paid_status)
    VALUES (%s, %s, %s, %s)
    """

    cursor.execute(sql, (fine_id, loan_id, amount, paid_status))

    connection.commit()
    cursor.close()

    return {"message": "Fines Added Successfully"}



@app.get("/fines_update")
def update_fines(
    fine_id: int,
    loan_id: int,
    amount: int,
    paid_status:str
):

    cursor = connection.cursor()

    sql = """
    UPDATE fines
    SET
        loan_id = %s,
        amount = %s,
        paid_status = %s
    WHERE
        fine_id = %s
    """

    cursor.execute(sql, (
       loan_id,
        amount,
        paid_status,
        fine_id
    ))

    connection.commit()

    if cursor.rowcount > 0:
        message = {"message": "fine Updated Successfully"}
    else:
        message = {"message": "fine Not Found"}

    cursor.close()

    return message



@app.get("/fines_delete")
def delete_fines(fine_id: int):

    cursor = connection.cursor()

    sql = "DELETE FROM fines WHERE fine_id=%s"

    cursor.execute(sql, (fine_id,))
    connection.commit()

    if cursor.rowcount > 0:
        message = {"message": "fine Deleted Successfully"}
    else:
        message = {"message": "fine Not Found"}

    cursor.close()

    return message



@app.get("/fines_patch")
def patch_fines(
        fine_id: int,
        loan_id: int,
        amount: int,
        paid_status: str

):
    cursor = connection.cursor()

    sql = """
    UPDATE fines
    SET
        loan_id = %s,
        amount = %s,
        paid_status = %s

    WHERE fine_id = %s
    """

    cursor.execute(sql, (
       loan_id,
       amount,
       paid_status,
        fine_id
    ))

    connection.commit()

    if cursor.rowcount > 0:
        message = {"message": "fine Patched Successfully"}
    else:
        message = {"message": "fine Not Found"}

    cursor.close()

    return message



@app.get("/genres")
def get_genres():
    cursor = connection.cursor()
    SQL = "SELECT * FROM genres"
    cursor.execute(SQL)
    rows = cursor.fetchall()
    genres = []
    for row in rows:
        genres.append({
            "genre_id": row[0],
            "genre_name": row[1]
        })
    cursor.close()
    return genres


@app.get("/genres_search")
def search_genres(genre_id: int):

    cursor = connection.cursor()

    sql = "SELECT * FROM genres WHERE genre_id = %s"

    cursor.execute(sql, (genre_id,))

    row = cursor.fetchone()

    cursor.close()

    if row:
        return {"genre_id": row[0],
        "genre_name": row[1]
    }


    return {"message": "genres Not Found"}

@app.get("/genres_add")
def add_genres(
    genre_id: int,
    genre_name: str
):
    cursor = connection.cursor()

    sql = """
    INSERT INTO genres (genre_id, genre_name)
    VALUES (%s, %s)
    """

    cursor.execute(sql, (genre_id, genre_name))

    connection.commit()
    cursor.close()

    return {"message": "Genre Added Successfully"}


@app.get("/genres_update")
def update_genres(
    genre_id: int,
    genre_name: str
):

    cursor = connection.cursor()

    sql = """
    UPDATE genres
    SET
        genre_name = %s
    WHERE
        genre_id = %s
    """

    cursor.execute(sql, (
       genre_name,
        genre_id
    ))

    connection.commit()

    if cursor.rowcount > 0:
        message = {"message": "genre Updated Successfully"}
    else:
        message = {"message": "genre Not Found"}

    cursor.close()

    return message



@app.get("/genres_delete")
def delete_genres(genre_id: int):

    cursor = connection.cursor()

    sql = "DELETE FROM genres WHERE genre_id=%s"

    cursor.execute(sql, (genre_id,))
    connection.commit()

    if cursor.rowcount > 0:
        message = {"message": "genre Deleted Successfully"}
    else:
        message = {"message": "genre Not Found"}

    cursor.close()

    return message


@app.get("/genres_patch")
def patch_genres(
        genre_id: int,
        genre_name: str

):
    cursor = connection.cursor()

    sql = """
    UPDATE genres
    SET
        genre_name = %s

    WHERE genre_id = %s
    """

    cursor.execute(sql, (
       genre_name,
        genre_id
    ))

    connection.commit()

    if cursor.rowcount > 0:
        message = {"message": "genre Patched Successfully"}
    else:
        message = {"message": "genre Not Found"}

    cursor.close()

    return message



@app.get("/loans")
def get_loans():
    cursor = connection.cursor()
    SQL = "SELECT * FROM loans"
    cursor.execute(SQL)
    rows = cursor.fetchall()
    loans = []
    for row in rows:
        loans.append({
            "loan_id": row[0],
            "user_id": row[1],
            "book_id": row[2],
            "loan_date": row[3],
            "return_date": row[4]
        })
    cursor.close()
    return loans



@app.get("/loans_search")
def search_loans(loan_id: int):

    cursor = connection.cursor()

    sql = "SELECT * FROM loans WHERE loan_id = %s"

    cursor.execute(sql, (loan_id,))

    row = cursor.fetchone()

    cursor.close()

    if row:
        return {"loan_id": row[0],
        "user_id": row[1],
        "book_id": row[2],
        "loan_date": row[3],
        "return_date": row[4]
    }


    return {"message": "Loans Not Found"}


@app.get("/loans_add")
def add_loan(
    loan_id:int,
    user_id:int,
    book_id:int,
    loan_date:str,
    return_date:str

):

    cursor=connection.cursor()

    sql="""
    INSERT INTO loans
    (loan_id,user_id,book_id,loan_date,return_date)
    VALUES(%s,%s,%s,%s,%s)
    """

    cursor.execute(sql,(
        loan_id,
        user_id,
        book_id,
        loan_date,
        return_date

    ))

    connection.commit()

    cursor.close()

    return{"message":"Loan Added Successfully"}



@app.get("/loans_update")
def update_loans(
    loan_id: int,
    user_id: int,
    book_id: int,
    loan_date: str,
    return_date: str
):

    cursor = connection.cursor()

    sql = """
    UPDATE loans
    SET
        user_id=%s,
        book_id=%s,
        loan_date=%s,
        return_date=%s
    WHERE loan_id=%s
    """

    cursor.execute(sql, (
        user_id,
        book_id,
        loan_date,
        return_date,
        loan_id
    ))

    connection.commit()

    if cursor.rowcount > 0:
        message = {"message": "Loan Updated Successfully"}
    else:
        message = {"message": "Loan Not Found"}

    cursor.close()

    return message


@app.get("/loans_delete")
def delete_loan(loan_id: int):

    cursor = connection.cursor()

    sql = "DELETE FROM loans WHERE loan_id=%s"

    cursor.execute(sql, (loan_id,))

    connection.commit()

    if cursor.rowcount > 0:
        message = {"message": "Loan Deleted Successfully"}
    else:
        message = {"message": "Loan Not Found"}

    cursor.close()

    return message



@app.get("/loans_patch")
def patch_loan(
    loan_id: int,
    return_date: str
):

    cursor = connection.cursor()

    sql = """
    UPDATE loans
    SET return_date=%s
    WHERE loan_id=%s
    """

    cursor.execute(sql, (
        return_date,
        loan_id
    ))

    connection.commit()

    if cursor.rowcount > 0:
        message = {"message": "Loan Status Updated Successfully"}
    else:
        message = {"message": "Loan Not Found"}

    cursor.close()

    return message



@app.get("/publishers")
def get_publishers():

    cursor = connection.cursor()

    sql = "SELECT * FROM publishers"

    cursor.execute(sql)

    rows = cursor.fetchall()

    publisher = []

    for row in rows:
        publisher.append({
            "publisher_id": row[0],
            "publisher_name": row[1],
            "city": row[2],
            "phone": row[3]
        })

    cursor.close()

    return publisher


@app.get("/publishers_search")
def search_publisher(publisher_id: int):

    cursor = connection.cursor()

    sql = "SELECT * FROM publishers WHERE publisher_id=%s"

    cursor.execute(sql, (publisher_id,))

    row = cursor.fetchone()

    cursor.close()

    if row:
        return {
            "publisher_id": row[0],
            "publisher_name": row[1],
            "city": row[2],
            "phone": row[3]
        }

    return {"message": "Publisher Not Found"}



@app.get("/publishers_add")
def add_publisher(
        publisher_id:int,
        publisher_name:str,
        city:str,
        phone:str
):

    cursor = connection.cursor()

    sql = """
    INSERT INTO publishers
    (publisher_id,publisher_name,city,phone)
    VALUES(%s,%s,%s,%s)
    """

    cursor.execute(sql,(
        publisher_id,
        publisher_name,
        city,
        phone
    ))

    connection.commit()

    cursor.close()

    return {"message":"Publisher Added Successfully"}



@app.get("/publishers_update")
def update_publisher(
        publisher_id:int,
        publisher_name:str,
        city:str,
        phone:str
):

    cursor = connection.cursor()

    sql = """
    UPDATE publishers
    SET
        publisher_name=%s,
        city=%s,
        phone=%s
    WHERE publisher_id=%s
    """

    cursor.execute(sql,(
        publisher_name,
        city,
        phone,
        publisher_id
    ))

    connection.commit()

    if cursor.rowcount>0:
        message={"message":"Publisher Updated Successfully"}
    else:
        message={"message":"Publisher Not Found"}

    cursor.close()

    return message



@app.get("/publishers_delete")
def delete_publisher(publisher_id:int):

    cursor = connection.cursor()

    sql = "DELETE FROM publishers WHERE publisher_id=%s"

    cursor.execute(sql,(publisher_id,))

    connection.commit()

    if cursor.rowcount>0:
        message={"message":"Publisher Deleted Successfully"}
    else:
        message={"message":"Publisher Not Found"}

    cursor.close()

    return message



@app.get("/publishers_patch")
def patch_publisher(
    publisher_id: int,
    phone: str
):

    cursor = connection.cursor()

    sql = """
    UPDATE publishers
    SET
        phone = %s
    WHERE
        publisher_id = %s
    """

    cursor.execute(sql, (
        phone,
        publisher_id
    ))

    connection.commit()

    if cursor.rowcount > 0:
        message = {"message": "Publisher Patched Successfully"}
    else:
        message = {"message": "Publisher Not Found"}

    cursor.close()

    return message




@app.get("/reservations")
def get_reservations():

    cursor = connection.cursor()

    sql = "SELECT * FROM reservations"

    cursor.execute(sql)

    rows = cursor.fetchall()

    reservations = []

    for row in rows:
        reservations.append({
            "reservation_id": row[0],
            "user_id": row[1],
            "book_id": row[2],
            "reservation_date": str(row[3]),
            "status": row[4]
        })

    cursor.close()

    return reservations


@app.get("/reservations_search")
def search_reservation(reservation_id: int):

    cursor = connection.cursor()

    sql = "SELECT * FROM reservations WHERE reservation_id=%s"

    cursor.execute(sql, (reservation_id,))

    row = cursor.fetchone()

    cursor.close()

    if row:
        return {
            "reservation_id": row[0],
            "user_id": row[1],
            "book_id": row[2],
            "reservation_date": str(row[3]),
            "status": row[4]
        }

    return {"message": "Reservation Not Found"}



@app.get("/reservations_add")
def add_reservation(
    reservation_id: int,
    user_id: int,
    book_id: int,
    reservation_date: str,
    status: str
):

    cursor = connection.cursor()

    sql = """
    INSERT INTO reservations
    (reservation_id,user_id,book_id,reservation_date,status)
    VALUES(%s,%s,%s,%s,%s)
    """

    cursor.execute(sql, (
        reservation_id,
        user_id,
        book_id,
        reservation_date,
        status
    ))

    connection.commit()

    cursor.close()

    return {"message": "Reservation Added Successfully"}



@app.get("/reservations_update")
def update_reservation(
    reservation_id: int,
    user_id: int,
    book_id: int,
    reservation_date: str,
    status: str
):

    cursor = connection.cursor()

    sql = """
    UPDATE reservations
    SET
        user_id=%s,
        book_id=%s,
        reservation_date=%s,
        status=%s
    WHERE reservation_id=%s
    """

    cursor.execute(sql, (
        user_id,
        book_id,
        reservation_date,
        status,
        reservation_id
    ))

    connection.commit()

    if cursor.rowcount > 0:
        message = {"message": "Reservation Updated Successfully"}
    else:
        message = {"message": "Reservation Not Found"}

    cursor.close()

    return message




@app.get("/reservations_delete")
def delete_reservation(reservation_id: int):

    cursor = connection.cursor()

    sql = "DELETE FROM reservations WHERE reservation_id=%s"

    cursor.execute(sql, (reservation_id,))

    connection.commit()

    if cursor.rowcount > 0:
        message = {"message": "Reservation Deleted Successfully"}
    else:
        message = {"message": "Reservation Not Found"}

    cursor.close()

    return message



@app.get("/reservations_patch")
def patch_reservation(
    reservation_id: int,
    status: str
):

    cursor = connection.cursor()

    sql = """
    UPDATE reservations
    SET status=%s
    WHERE reservation_id=%s
    """

    cursor.execute(sql, (
        status,
        reservation_id
    ))

    connection.commit()

    if cursor.rowcount > 0:
        message = {"message": "Reservation Status Updated Successfully"}
    else:
        message = {"message": "Reservation Not Found"}

    cursor.close()

    return message



@app.get("/reviews")
def get_reviews():

    cursor = connection.cursor()

    sql = "SELECT * FROM reviews"

    cursor.execute(sql)

    rows = cursor.fetchall()

    review = []

    for row in rows:
        review.append({
            "review_id": row[0],
            "user_id": row[1],
            "book_id": row[2],
            "rating": row[3],
            "comments": row[4]
        })

    cursor.close()

    return review



@app.get("/reviews_search")
def search_review(review_id: int):

    cursor = connection.cursor()

    sql = "SELECT * FROM reviews WHERE review_id=%s"

    cursor.execute(sql, (review_id,))

    row = cursor.fetchone()

    cursor.close()

    if row:
        return {
            "review_id": row[0],
            "user_id": row[1],
            "book_id": row[2],
            "rating": row[3],
            "comments": row[4]
        }

    return {"message": "Review Not Found"}



@app.get("/reviews_add")
def add_review(
    review_id: int,
    user_id: int,
    book_id: int,
    rating: int,
    comments: str
):

    cursor = connection.cursor()

    sql = """
    INSERT INTO reviews
    (review_id,user_id,book_id,rating,comments)
    VALUES(%s,%s,%s,%s,%s)
    """

    cursor.execute(sql, (
        review_id,
        user_id,
        book_id,
        rating,
        comments
    ))

    connection.commit()

    cursor.close()

    return {"message": "Review Added Successfully"}



@app.get("/reviews_update")
def update_review(
    review_id: int,
    user_id: int,
    book_id: int,
    rating: int,
    comments: str
):

    cursor = connection.cursor()

    sql = """
    UPDATE reviews
    SET
        user_id=%s,
        book_id=%s,
        rating=%s,
        comments=%s
    WHERE review_id=%s
    """

    cursor.execute(sql, (
        user_id,
        book_id,
        rating,
        comments,
        review_id
    ))

    connection.commit()

    if cursor.rowcount > 0:
        message = {"message": "Review Updated Successfully"}
    else:
        message = {"message": "Review Not Found"}

    cursor.close()

    return message



@app.get("/reviews_delete")
def delete_review(review_id: int):

    cursor = connection.cursor()

    sql = "DELETE FROM reviews WHERE review_id=%s"

    cursor.execute(sql, (review_id,))

    connection.commit()

    if cursor.rowcount > 0:
        message = {"message": "Review Deleted Successfully"}
    else:
        message = {"message": "Review Not Found"}

    cursor.close()

    return message




@app.get("/reviews_patch")
def patch_review(
    review_id: int,
    rating: int
):

    cursor = connection.cursor()

    sql = """
    UPDATE reviews
    SET rating=%s
    WHERE review_id=%s
    """

    cursor.execute(sql, (
        rating,
        review_id
    ))

    connection.commit()

    if cursor.rowcount > 0:
        message = {"message": "Review Rating Updated Successfully"}
    else:
        message = {"message": "Review Not Found"}

    cursor.close()

    return message



@app.get("/users")
def get_users():

    cursor = connection.cursor()

    sql = "SELECT * FROM users"

    cursor.execute(sql)

    rows = cursor.fetchall()

    users = []

    for row in rows:
        users.append({
            "user_id": row[0],
            "name": row[1],
            "email": row[2],
            "phone": row[3],
            "address": row[4]
        })

    cursor.close()

    return users



@app.get("/users_search")
def search_user(user_id: int):

    cursor = connection.cursor()

    sql = "SELECT * FROM users WHERE user_id=%s"

    cursor.execute(sql, (user_id,))

    row = cursor.fetchone()

    cursor.close()

    if row:
        return {
            "user_id": row[0],
            "name": row[1],
            "email": row[2],
            "phone": row[3],
            "address": row[4]
        }

    return {"message": "User Not Found"}



@app.get("/users_add")
def add_user(
    user_id: int,
    name: str,
    email: str,
    phone: str,
    address: str
):

    cursor = connection.cursor()

    sql = """
    INSERT INTO users
    (user_id,name,email,phone,address)
    VALUES(%s,%s,%s,%s,%s)
    """

    cursor.execute(sql, (
        user_id,
        name,
        email,
        phone,
        address
    ))

    connection.commit()

    cursor.close()

    return {"message": "User Added Successfully"}



@app.get("/users_update")
def update_user(
    user_id: int,
    name: str,
    email: str,
    phone: str,
    address: str
):

    cursor = connection.cursor()

    sql = """
    UPDATE users
    SET
        name=%s,
        email=%s,
        phone=%s,
        address=%s
    WHERE user_id=%s
    """

    cursor.execute(sql, (
        name,
        email,
        phone,
        address,
        user_id
    ))

    connection.commit()

    if cursor.rowcount > 0:
        message = {"message": "User Updated Successfully"}
    else:
        message = {"message": "User Not Found"}

    cursor.close()

    return message



@app.get("/users_delete")
def delete_user(user_id: int):

    cursor = connection.cursor()

    sql = "DELETE FROM users WHERE user_id=%s"

    cursor.execute(sql, (user_id,))

    connection.commit()

    if cursor.rowcount > 0:
        message = {"message": "User Deleted Successfully"}
    else:
        message = {"message": "User Not Found"}

    cursor.close()

    return message



@app.get("/users_patch")
def patch_user(
    user_id: int,
    phone: str
):

    cursor = connection.cursor()

    sql = """
    UPDATE users
    SET phone=%s
    WHERE user_id=%s
    """

    cursor.execute(sql, (
        phone,
        user_id
    ))

    connection.commit()

    if cursor.rowcount > 0:
        message = {"message": "User Phone Updated Successfully"}
    else:
        message = {"message": "User Not Found"}

    cursor.close()

    return message








