import styles from './Grid.module.css';

function Grid()
{
    const MAX_ATTEMPTS = 6;
    const WORD_LENGTH = 5;
    
    return (<>
        <div className={styles.main}>
            {Array.from({length: MAX_ATTEMPTS}).map((_, index) => {
                return <div key={index} className={styles.row}>
                    {Array.from({length: WORD_LENGTH}).map((_, cellIndex) => {
                        return <div key={cellIndex} className={styles.cell}></div>
                    })}
                </div>
            })}
        </div>
    </>)
}

export default Grid;