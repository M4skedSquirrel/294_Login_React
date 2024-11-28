import '../styles/Portfolio.css';
import React, { useState, useEffect } from 'react';

function Portfolio({ userData }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [portfolioData, setPortfolioData] = useState(null);

  useEffect(() => {
    async function fnGetPortfolioDatas() {
        if (userData && userData.level && userData.num_personne) {
            try {
              const response = await fetch('193.108.54.49:8080/utgGETNotes/0/null', {
                method: "POST",
                body: JSON.stringify({
                  level: userData.level,
                  id: userData.num_personne,
                  note: userData.note
                }),
                headers: {
                  "Content-Type": "application/json",
                  "charset": "utf-8",
                },
              });
              const data = await response.json();
              setPortfolioData(data);
            } catch (error) {
              console.log(error);
            }
        }
    }

    fnGetPortfolioDatas();

    async function loadPortfolioData() {
        const data = await fnGetPortfolioDatas(userData);
        if (data) {
          setPortfolioData(data);
        }
      }
    
      loadPortfolioData();
    }, [userData]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPortfolioData = portfolioData?.filter(course =>
    course.Note !== null &&
    (course.Session.toLowerCase().includes(searchTerm.toLowerCase()) ||
     course.Nom_du_cours.toLowerCase().includes(searchTerm.toLowerCase()) ||
     course.Lieu_du_cours.toLowerCase().includes(searchTerm.toLowerCase()))
  );


  return (
    <div className="">
      <div className="control has-icons-left">
        <input
          className="input is-medium"
          type="text"
          placeholder="Search a course notatiom"
          value={searchTerm}
          onChange={handleSearch}
        />
        <span className="icon is-small is-left">
          <i className="Fa-faSearch"></i>
        </span>
        <div className='ml-4 field has-addons'>
          <h1 className='my-4 has-text-weight-bold is-size-2'>Portfolio</h1>
        </div>

        <div className="columns">
          <div className="m-6 field has-addons">
            <div className="column is-half">
            </div>
          </div>
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
              {filteredPortfolioData ?
                filteredPortfolioData.map((course) => (
                  <tr key={course.Num_Session}>
                    <td>
                      <div>{course.Session}</div>
                      <div>{formatDate(course.Date_session)}</div>
                    </td>
                    <td>{course.Nom_du_cours}</td>
                    <td>{course.Lieu_du_cours}</td>
                  </tr>
                )) :
                <tr><td colSpan="3">Aucun cours</td></tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Portfolio;