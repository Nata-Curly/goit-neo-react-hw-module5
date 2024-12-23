import { Link } from "react-router-dom";
import notFoundPoster from '../../images/not_found_page.jpg';
import css from './NotFoundPage.module.css'

const NotFoundPage = () => { 
    return (
      <main className={css.notFoundPage}>
        <Link className={css.link} to='/'>Oops, something went wrong... let`s go Home
        </Link>
          <img src={notFoundPoster} alt="Not found poster" />
      </main>
    );
};

export default NotFoundPage;