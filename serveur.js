import { createConnection } from 'mysql2';

const connection = createConnection(
  'mysql://root:@127.0.0.1:3306/leaderboard'
);

const insertValue=(Pseudo ,Score, GameMode) => {
    let id = 0;
    const checkIdQuery = `SELECT id FROM leaderboard WHERE Pseudo = ? LIMIT 1`;
    connection.query(checkIdQuery,[Pseudo],(error,idResult)=>{
        if(error){
            console.log("une erreur c'est produite lors de la réupération de l'id !");
        }
        id = idResult[0].id;
    });

    const check = `SELECT COUNT(*) as count FROM leaderboard WHERE Pseudo = ?`;

    connection.query(check, [Pseudo], (error, results)=>{
        if(error){
            console.log("Une Erreur C'est produite lors de la verification !");
            return;
        }
        const count = results[0].count;
        if (count===1){
            const replace = `UPDATE leaderboard SET Score = ?, GameMode = ? WHERE id = ?`
            const replaceValue = [Score, GameMode, id];
            connection.query(replace, replaceValue);
            console.log('la');
        } else if(count===0){
            const sql = `INSERT INTO leaderboard (Pseudo, Score, GameMode) VALUES (?, ?, ?)`;
            const value = [Pseudo, Score, GameMode]
            connection.query(sql, value, (error)=>{
                if(error){
                    console.log("Une Erreur C'est produite lors de l'envoi des donnés !")
                }
            });
        }
    });
}

connection.addListener('error', (err) => {
  console.log(err);
});