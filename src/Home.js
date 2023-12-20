import { useContext } from 'react';
import styles from './styles/Home.module.css'
import { AuthContext } from './components/AuthContext';
function Home() {
    const { user } = useContext(AuthContext);
    if (user?.email)
    {
        return (

            <div className={styles.header}>
                <div className={styles.overlay}>
                    <h1>To Do list</h1>
                    <h3>Click above to see your lists.</h3>
                    <p>You can create a list and add too it!</p>
                    <br></br>
                </div>
            </div>


        )
    }
    else {
        return (

            <div className={styles.header}>
                <div className={styles.overlay}>
                    <h1>Create a To Do list</h1>
                    <h3>Click above to login</h3>
                    <p>To access the lists, you must create a login. This is to showcase my backend knowledge.</p>
                    <br></br>
                </div>
            </div>


        )
    }

}

export default Home;
