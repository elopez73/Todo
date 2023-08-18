import styles from './styles/Home.module.css'
function Home() {

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

export default Home;
