import '../styles/Planning.css';
import { useState, useEffect } from 'react';

function Planning({userData}) {
    const [planningData, setPlanningData] = useState(null);

    useEffect(() => {
        async function fetchPlanningData() {
            try {
                const response = await fetch('http://193.108.54.49:8080/utgGETPlanningCours/1', {
                    method: "POST",
                    body: JSON.stringify({
                        level: userData.level,
                        id: userData.num_personne
                    }),
                    headers: {
                        "Content-Type": "application/json", 
                        "charset": "utf-8",
                    },
                });

                const data = await response.json();
                setPlanningData(data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchPlanningData();
    }, [userData.level, userData.num_personne]); // Dépendances du useEffect

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', { 
            year: 'numeric', 
            month: 'numeric', 
            day: 'numeric' 
        });
    };


    return ( 
        <div className="">
            {/* Barre de recherche */}
            <div className="">
                <div className="control has-icons-left">
                        <input
                            className="input is-medium"
                            type="text"
                            placeholder="Search a course"
                        />
                        <span className="icon is-small is-left">
                            <i className="Fa-faSearch"></i>
                        </span>
                    </div>
                </div>
                <div className=' my-6 field has-addons '>
                    <h1 className='ml-4 has-text-weight-bold is-size-2'>Planning</h1>
                </div>
                <div>
                    <p>userInfo: {userData.num_personne}</p>
                </div>                
            <div className="columns">
                <div className="column is-half planning">
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>
                                    <div>Module</div>
                                    <div>Date</div>
                                </th>
                                <th>Cours</th>
                                <th>Lieu</th>
                            </tr>
                        </thead>
                        <tbody>
                            {planningData != null ?
                                planningData
                                    .filter((course) => course.Date_session > new Date().toISOString())
                                    .map((course) => (
                                        <tr key={course.Num_Session}>
                                            <td>
                                                <div>{course.Session}</div>
                                                <div>{formatDate(course.Date_session)}</div>
                                            </td>
                                            <td>{course.Nom_du_cours}</td>
                                            <td>{course.Lieu_du_cours}</td>
                                        </tr>
                                    )) : ("Aucun cours")}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
  }
  
 

  export default Planning;