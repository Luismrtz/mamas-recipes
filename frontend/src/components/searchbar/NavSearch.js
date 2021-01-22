import React, {useState, useRef, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { listRecipes} from '../../actions/recipeActions';
import { useHistory } from 'react-router-dom';
import styles from './SearchBar.module.scss'
import cx from "classnames";
const NavSearch = ({props, location, open}) => {

  const history = useHistory();

    const rList = useSelector(state => state.rList);
const {recipes} = rList;

const dispatch = useDispatch();

useEffect(() => {
    dispatch(listRecipes());
    return () => {
        //
     }
}, [dispatch])

    const [display, setDisplay] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const wrapRef = useRef(null);


    const results = !searchTerm ? (recipes && recipes) : recipes && recipes.filter(recipe =>
        recipe.nameOfRecipe.toLowerCase().includes(searchTerm.toLowerCase())
        )

        // const params = new URLSearchParams(location);
        // const q = params.get(searchTerm)
      // console.log(q)


    const handleChange = e => {
        setSearchTerm(e.target.value);
      }

      const handleSubmit = (e) => {
          e.preventDefault();
        
            history.push(`/search?q=${searchTerm}`);
      }

      const keySubmit = (e) => {
        
          if(e.key === 'ENTER') {
            e.preventDefault();
            history.push("/search?q=" + searchTerm);
          }
      }

      const setRecipeSearch = rName => {
          setSearchTerm(rName);
          setDisplay(false);
      }


      const displayTextbox = () => {
        setDisplay(true);
      }


      useEffect(() => {
          document.addEventListener('mousedown' ,handleClickOutside);
          return () => {
            document.removeEventListener('mousedown', handleClickOutside)
          }
      }, [])

      const handleClickOutside = (e) => {
          const {current: wrap} = wrapRef;
          if (wrap && !wrap.contains(e.target)) {
              setDisplay(false);
          }
      }
      const setTextName = (recipe) => (e) => {
        setRecipeSearch(recipe.nameOfRecipe)
        if(e.key === 'ENTER') {
            setRecipeSearch(recipe.nameOfRecipe)
            // wrapRef.current.focus();
        }
      }

    return (
        <div ref={wrapRef} >
         <form  onSubmit={handleSubmit} className={ open === false ? 
          cx( styles.inactive)
        : cx(styles.active)
           }>
         <div className={styles.navFlex}>
          <input  type="text" placeholder="Search" value={searchTerm} onClick={displayTextbox} onChange={handleChange} onKeyPress={keySubmit}/>
          <button type="submit" className={cx(styles.navBtn, 'fa fa-search')}></button>
        </div>
        <ul className={styles.queryWrap}>
          {searchTerm !== '' && display === true ?
          (results && results.slice(0,5).map(recipe => {
            return <li className={styles.query} onClick={setTextName(recipe)} onKeyPress={setTextName(recipe)} key={recipe._id} tabIndex="0">
                
                {recipe.nameOfRecipe}
                
                </li>
          }))
          : ''
        }
        </ul>
       
      </form>
        </div>
    )
}

export default NavSearch
