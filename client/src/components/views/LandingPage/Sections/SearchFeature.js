import React, { useRef, useState } from 'react';
import styles from './SearchFeature.module.css';


function SearchFeature(props) {
    const searchRef = useRef();
    const [searchTerms, setSearchTerms] = useState("")

    const onChange = event => {
      event.preventDefault();
      setSearchTerms(event.currentTarget.value);
      props.refreshFunction(searchRef.current.value)
    }

    return (
      <form className={styles.form}>
        <input 
          type="search" 
          className={styles.searchInput} 
          placeholder="Search by Typing.." 
          onChange={onChange}
          value={searchTerms} 
          ref={searchRef}
        />
        <button onClick={onChange}>Search</button>
      </form>
    )
}

export default SearchFeature

      // <InputGroup className="mb-3">
      //   <FormControl
      //     placeholder="Search by Typing.."
      //     aria-label="Search by Typing.."
      //     aria-describedby="basic-addon2"
      //     onChange={onChange}
      //     value={searchTerms}
      //     ref={searchRef}
      //   />
      //   <Button variant="outline-secondary" id="button-addon2" onClick={onSubmit}>
      //     Search
      //   </Button>
      // </InputGroup>