import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class ReportViolenceCard extends React.Component {
  constructor(props) {
    super(props)
    let stateVar = {
      fetchingData: true,
      truncate: false,
      dataJSON: {
        data: {}
      },
      schemaJSON: undefined,
      optionalConfigJSON: {},
      optionalConfigSchemaJSON: undefined
    };

    if (this.props.dataJSON) {
      stateVar.fetchingData = false;
      stateVar.dataJSON = this.props.dataJSON;
    }

    if (this.props.schemaJSON) {
      stateVar.schemaJSON = this.props.schemaJSON;
    }

    if (this.props.optionalConfigJSON) {
      stateVar.optionalConfigJSON = this.props.optionalConfigJSON;
    }

    if (this.props.optionalConfigSchemaJSON) {
      stateVar.optionalConfigSchemaJSON = this.props.optionalConfigSchemaJSON;
    }

    this.state = stateVar;
  }

  exportData() {
    return document.getElementById('protograph-div').getBoundingClientRect();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.optionalConfigJSON) {
      this.setState({
        optionalConfigJSON: nextProps.optionalConfigJSON
      });
    }
  }

  componentDidMount() {
    // get sample json data based on type i.e string or object
    if (this.state.fetchingData){
      axios.all([axios.get(this.props.dataURL), axios.get(this.props.schemaURL), axios.get(this.props.optionalConfigURL), axios.get(this.props.optionalConfigSchemaURL)])
        .then(axios.spread((card, schema, opt_config, opt_config_schema) => {
          console.log(card, "card")
          this.setState({
            fetchingData: false,
            dataJSON: {
              data: card.data.data
            },
            schemaJSON: schema.data,
            optionalConfigJSON: opt_config.data,
            optionalConfigSchemaJSON: opt_config_schema.data
          });
        }));
    }
  }

  handleReadMoreClick(e) {
    document.getElementById('read-more-button').style.display = 'none'
    document.querySelector('.hide-content').style.display = 'block'
    if(typeof this.props.clickCallback === 'function') {
      this.props.clickCallback();
    } 
  }

  renderLaptop(){
    if (this.state.schemaJSON === undefined ){
      return(<div>Loading</div>)
    } else {
      let styles = {
        width: '640px'
      }
      const data = this.state.dataJSON.data;
      let copy_paste_from_article = data.copy_paste_from_article,
        when_and_where_it_occur = data.when_and_where_it_occur,
        the_incident = data.the_incident,
        the_people_involved = data.the_people_involved,
        hate_crime = data.hate_crime,
        addendum = data.addendum;
      let police_ratio = when_and_where_it_occur.police_to_population_in_state.split(" "),
        gender = hate_crime.is_gender_hate_crime === 'Yes' ? 'Gender, ' : '',
        caste = hate_crime.is_caste_hate_crime === 'Yes' ? 'caste, ' : '',
        race = hate_crime.is_race_hate_crime === 'Yes' ? 'race, ' : '',
        religion = hate_crime.is_religion_hate_crime === 'Yes' ? 'religion, ' : '',
        political = hate_crime.is_political_affiliation_hate_crime === 'Yes' ? 'political affiliation, ' : '',
        sexual = hate_crime.is_sexual_orientation_and_gender_identity_hate_crime === 'Yes' ? 'sexual orientation and gender identity, ' : '',
        disability = hate_crime.is_disability_hate_crime === 'Yes' ? 'disability, ' : '',
        ethnicity = hate_crime.is_ethnicity_hate_crime === 'Yes' ? 'ethnicity' : '';
    return(
        <div id="protograph-div" className="lynching-card" style={styles}>
          <div className="stamp-area">
            {hate_crime.is_hate_crime === 'Yes' ? <div className="hate-crime-rubber_stamp">
              <div className="inner-hate-crime-rubber_stamp">
                <div className="state-name">Hate<br/>crime</div>
              </div>
            </div> : ''}
            <div className="crime-rubber_stamp">
              <div className="stamp-text">classification :</div>
              <div className="state-name">{the_incident.classification}</div>
            </div>
            <div className="state-rubber_stamp">
              <div className="stamp-text">state of law and order in</div>
                  <div className="state-name">{when_and_where_it_occur.state}</div>
                  <div className="form-area">
                  <table>
                      <tr>
                      <td className="text-right">Judge to population:</td>
                      <td className="text-left">{when_and_where_it_occur.judge_to_population_in_state}</td>
                    </tr>
                    <tr>
                      <td className="text-right">Police to population:</td>
                      <td className="text-left">{police_ratio[0]} {police_ratio[1]}<br/>{police_ratio[2]}</td>
                    </tr>
                    <tr>
                      <td className="text-right">Police mobility:</td>
                      <td className="text-left">{when_and_where_it_occur.police_vehicles_per_km}</td>
                    </tr>
                    <tr>
                      <td className="text-right">Village defence force:</td>
                      <td className="text-left">{when_and_where_it_occur.does_state_have_village_defence_force}</td>
                    </tr>
                </table>
              </div>
            </div>
          </div>
          <div className="first-portion">
            <div className="col-area col-8-area border-right">
              <div className="form-title">INCIDENT INFORMATION:</div>
              <div className="card-title">{the_people_involved.title}</div>
              <div className="form-element event-fixed-height">
                <div className="form-lable">Event description:</div>
                <div className="form-content">{the_incident.describe_the_event}</div>
              </div>
              <div className="form-element">
                <div className="form-lable"> Type/s of hate crime:</div>
                {gender === '' && caste === '' && race === '' && religion === '' && political === '' && sexual === '' && disability === '' && ethnicity === '' ? '-': <div className="form-content">{gender} {caste} {race} {religion} {political} {sexual} {disability} {ethnicity}</div>} 
              </div>
              <div className="col-area col-7-area no-padding-col">
                <div className="form-element no-bottom-margin">
                  <div className="form-lable">Was the incident planned?</div>
                  <div className="form-content">{the_incident.was_incident_planned}</div>
                </div>
              </div>
              <div className="col-area col-2-area no-padding-col">
                <div className="form-element no-bottom-margin">
                  <div className="form-lable"> Injured:</div>
                  <div className="form-content">{the_incident.count_injured}</div>
                </div>
              </div>
              <div className="col-area col-2-area no-padding-col">
                <div className="form-element no-bottom-margin">
                  <div className="form-lable"> Dead:</div>
                  <div className="form-content">{the_incident.count_dead}</div>
                </div>
              </div>
            </div>
            <div className="col-area col-4-area">
              <div className="image-area">
                <div className="form-lable">Photo:</div>
                {copy_paste_from_article.image !== '' ? <img src={copy_paste_from_article.image} style={{width: '100%'}}/> : <div className="no-image-div protograph-margin"></div>}
              </div>
              <div className="area-info">
                <div className="form-element">
                  <div className="form-lable">Date:</div>
                  <div className="form-content">{when_and_where_it_occur.approximate_date_of_incident}</div>
                </div>
                <div className="form-element">
                  <div className="form-lable">District:</div>
                  <div className="form-content">{when_and_where_it_occur.district}</div>
                </div>
                <div className="form-element">
                  <div className="form-lable">Area:</div>
                  <div className="form-content">{when_and_where_it_occur.area}</div>
                </div>
                <div className="form-element">
                  <div className="form-lable">Area type:</div>
                  <div className="form-content">{when_and_where_it_occur.area_classification}</div>
                </div>
                <div className="form-element">
                  <div className="form-lable">Ruling party:</div>
                  <div className="form-content">{when_and_where_it_occur.party_whose_chief_minister_is_in_power}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="second-portion">
            <div className="col-area col-6-area border-right">
              <div className="form-title">VICTIM INFORMATION:</div>
              {the_people_involved.victim_names !== '' ? <div className="form-element names-fixed-height"><div className="form-lable">Name/s:</div><div className="form-content">{the_people_involved.victim_names}</div></div> : ''}
              <div className="form-element">
                <div className="form-lable">Gender</div>
                <div className="form-content">{the_people_involved.victim_sex}</div>
              </div>
              <div className="form-element">
                <div className="form-lable">Social classification:</div>
                <div className="form-content">{the_people_involved.victim_social_classification}</div>
                <div className="hint-text">({the_people_involved.victim_social_classification_notes})</div>
              </div>
            </div>
            <div className="col-area col-6-area">
              <div className="form-title">ACCUSED INFORMATION:</div>
              {the_people_involved.accused_names !== '' ? <div className="form-element names-fixed-height"><div className="form-lable">Name/s:</div><div className="form-content">{the_people_involved.accused_names}</div></div> : ''}
              <div className="form-element">
                <div className="form-lable">Gender</div>
                <div className="form-content">{the_people_involved.accused_sex}</div>
              </div>
              <div className="form-element">
                <div className="form-lable">Social classification:</div>
                <div className="form-content">{the_people_involved.accused_social_classification}</div>
                <div className="hint-text">({the_people_involved.accused_social_classification_notes})</div>
              </div>
            </div>
          </div>
          {addendum.notes_to_explain_nuances !== 'No' ? <div className="note">
            <div className="form-title">NOTE:</div>
            <div className="note-text">{addendum.notes_to_explain_nuances}</div>
          </div>: ''}
          {addendum.referral_link_1 !== '' && addendum.referral_link_2 !== '' && addendum.referral_link_3 !== '' ? <div className="referral-links">
            <div className="form-title">REFERRAL LINKS:</div>
            {addendum.referral_link_1 !== '' ? <div className="single-link note-text">{addendum.referral_link_1}</div>: ''}
            {addendum.referral_link_2 !== '' ? <div className="single-link note-text">{addendum.referral_link_2}</div>: ''}
            {addendum.referral_link_3 !== '' ? <div className="single-link note-text">{addendum.referral_link_3}</div>: ''}
          </div> : '' }
      </div>
    )
    }
  }

  renderMobile() {
    if (this.state.schemaJSON === undefined ){
      return(<div>Loading</div>)
    } else {
      let styles = {
        width: '300px'
      }
      const data = this.state.dataJSON.data;
      let copy_paste_from_article = data.copy_paste_from_article,
        when_and_where_it_occur = data.when_and_where_it_occur,
        the_incident = data.the_incident,
        the_people_involved = data.the_people_involved,
        hate_crime = data.hate_crime,
        addendum = data.addendum;
      let police_ratio = when_and_where_it_occur.police_to_population_in_state.split(" "),
        gender = hate_crime.is_gender_hate_crime === 'Yes' ? 'Gender, ' : '',
        caste = hate_crime.is_caste_hate_crime === 'Yes' ? 'caste, ' : '',
        race = hate_crime.is_race_hate_crime === 'Yes' ? 'race, ' : '',
        religion = hate_crime.is_religion_hate_crime === 'Yes' ? 'religion, ' : '',
        political = hate_crime.is_political_affiliation_hate_crime === 'Yes' ? 'political affiliation, ' : '',
        sexual = hate_crime.is_sexual_orientation_and_gender_identity_hate_crime === 'Yes' ? 'sexual orientation and gender identity, ' : '',
        disability = hate_crime.is_disability_hate_crime === 'Yes' ? 'disability, ' : '',
        ethnicity = hate_crime.is_ethnicity_hate_crime === 'Yes' ? 'ethnicity' : '';
      return(
        <div id="protograph-div" className="lynching-card-mobile" style={styles}>
          <div className="stamp-area-mobile">
            {hate_crime.is_hate_crime === 'Yes' ? <div className="hate-crime-rubber_stamp-mobile">
              <div className="inner-hate-crime-rubber_stamp-mobile">
                <div className="state-name-mobile">Hate<br/>crime</div>
              </div>
            </div> : ''}
            <div className="crime-rubber_stamp-mobile">
              <div className="stamp-text">classification :</div>
              <div className="state-name">{the_incident.classification}</div>
            </div>
            <div className="state-rubber_stamp-mobile">
              <div className="stamp-text">state of law and order in</div>
                <div className="state-name">{when_and_where_it_occur.state}</div>
                <div className="form-area">
                <table>
                  <tr>
                  <td className="text-right">Judge to population:</td>
                  <td className="text-left">{when_and_where_it_occur.judge_to_population_in_state}</td>
                  </tr>
                  <tr>
                    <td className="text-right">Police to population:</td>
                    <td className="text-left">{police_ratio[0]} {police_ratio[1]}<br/>{police_ratio[2]}</td>
                  </tr>
                  <tr>
                    <td className="text-right">Police mobility:</td>
                    <td className="text-left">{when_and_where_it_occur.police_vehicles_per_km}</td>
                  </tr>
                  <tr>
                    <td className="text-right">Village defence force:</td>
                    <td className="text-left">{when_and_where_it_occur.does_state_have_village_defence_force}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div className="first-portion-mobile">
            <div className="col-area col-8-area-mobile border-right-mobile">
              <div className="form-title">INCIDENT INFORMATION:</div>
              <div className="card-title">{the_people_involved.title}</div>
              <div className="form-element event-fixed-height-mobile">
                <div className="form-lable">Event description:</div>
                <div className="form-content">{the_incident.describe_the_event}</div>
              </div>
              <div className="form-element">
                <div className="form-lable"> Type/s of hate crime:</div>
                {gender === '' && caste === '' && race === '' && religion === '' && political === '' && sexual === '' && disability === '' && ethnicity === '' ? '-': <div className="form-content">{gender} {caste} {race} {religion} {political} {sexual} {disability} {ethnicity}</div>} 
              </div>
              <div className="form-element">
                <div className="form-lable">Was the incident planned?</div>
                <div className="form-content">{the_incident.was_incident_planned}</div>
              </div>
              <div className="col-area col-2-area-mobile no-padding-col-mobile">
                <div className="form-element">
                  <div className="form-lable"> Injured:</div>
                  <div className="form-content">{the_incident.count_injured}</div>
                </div>
              </div>
              <div className="col-area col-2-area-mobile no-padding-col-mobile">
                <div className="form-element">
                  <div className="form-lable"> Dead:</div>
                  <div className="form-content">{the_incident.count_dead}</div>
                </div>
              </div>
            </div>
            <div className="col-area col-4-area-mobile">
              <div className="image-area-mobile">
                <div className="form-lable">Photo:</div>
                {copy_paste_from_article.image !== '' ? <img src={copy_paste_from_article.image} style={{width: '100%'}}/> : <div className="no-image-div protograph-margin"></div>}
              </div>
              <div className="area-info">
                <div className="form-element">
                  <div className="form-lable">Date:</div>
                  <div className="form-content">{when_and_where_it_occur.approximate_date_of_incident}</div>
                </div>
                <div className="form-element">
                  <div className="form-lable">District:</div>
                  <div className="form-content">{when_and_where_it_occur.district}</div>
                </div>
                <div className="form-element">
                  <div className="form-lable">Area:</div>
                  <div className="form-content">{when_and_where_it_occur.area}</div>
                </div>
                <div className="form-element">
                  <div className="form-lable">Area type:</div>
                  <div className="form-content">{when_and_where_it_occur.area_classification}</div>
                </div>
                <div className="form-element">
                  <div className="form-lable">Ruling party:</div>
                  <div className="form-content">{when_and_where_it_occur.party_whose_chief_minister_is_in_power}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="second-portion">
            <div className="col-area col-6-area-mobile border-right-mobile">
              <div className="form-title">VICTIM INFORMATION:</div>
              {the_people_involved.victim_names !== '' ? <div className="form-element names-fixed-height-mobile"><div className="form-lable">Name/s:</div><div className="form-content">{the_people_involved.victim_names}</div></div> : ''}
              <div className="form-element">
                <div className="form-lable">Gender</div>
                <div className="form-content">{the_people_involved.victim_sex}</div>
              </div>
              <div className="form-element">
                <div className="form-lable">Social classification:</div>
                <div className="form-content">{the_people_involved.victim_social_classification}</div>
                <div className="hint-text">({the_people_involved.victim_social_classification_notes})</div>
              </div>
            </div>
            <div className="col-area col-6-area-mobile">
              <div className="form-title">ACCUSED INFORMATION:</div>
              {the_people_involved.accused_names !== '' ? <div className="form-element names-fixed-height-mobile"><div className="form-lable">Name/s:</div><div className="form-content">{the_people_involved.accused_names}</div></div> : ''}
              <div className="form-element">
                <div className="form-lable">Gender</div>
                <div className="form-content">{the_people_involved.accused_sex}</div>
              </div>
              <div className="form-element">
                <div className="form-lable">Social classification:</div>
                <div className="form-content">{the_people_involved.accused_social_classification}</div>
                <div className="hint-text">({the_people_involved.accused_social_classification_notes})</div>
              </div>
            </div>
          </div>
          {addendum.notes_to_explain_nuances !== 'No' ? <div className="note-mobile">
            <div className="form-title">NOTE:</div>
            <div className="note-text">{addendum.notes_to_explain_nuances}</div>
          </div>: ''}
          {addendum.referral_link_1 !== '' && addendum.referral_link_2 !== '' && addendum.referral_link_3 !== '' ? <div className="referral-links">
            <div className="form-title">REFERRAL LINKS:</div>
            {addendum.referral_link_1 !== '' ? <div className="single-link note-text">{addendum.referral_link_1}</div>: ''}
            {addendum.referral_link_2 !== '' ? <div className="single-link note-text">{addendum.referral_link_2}</div>: ''}
            {addendum.referral_link_3 !== '' ? <div className="single-link note-text">{addendum.referral_link_3}</div>: ''}
          </div> : '' }
        </div>
      )
    }   
  }

  renderOldLaptop() {
    if (this.state.schemaJSON === undefined ){
      return(<div>Loading</div>)
    } else {
      const data = this.state.dataJSON.data;
      let copy_paste_from_article = data.copy_paste_from_article,
        when_and_where_it_occur = data.when_and_where_it_occur,
        the_incident = data.the_incident,
        the_people_involved = data.the_people_involved,
        hate_crime = data.hate_crime,
        addendum = data.addendum;
      console.log("the_people_involved", data)
      let styles = this.state.optionalConfigJSON ? {backgroundColor: this.state.optionalConfigJSON.background_color} : undefined;
      return (
        <div id="protograph-div" style = {styles}>
          <div classNameName="protograph-card">
            <div classNameName="ui grid">
              <div classNameName="sixteen wide column">
                <h3 classNameName="ui header">{the_people_involved.title}</h3>
                <h6 classNameName="ui header">{when_and_where_it_occur.area}, {when_and_where_it_occur.district}, {when_and_where_it_occur.state} ({when_and_where_it_occur.area_classNameification})</h6>
                <h6 classNameName='ui header'>{when_and_where_it_occur.approximate_date_of_incident}</h6>
              </div>
              <div classNameName="eight wide column" style={{paddingRight: '30px'}}>
                <sup>WHAT HAPPENED?</sup>
                <p classNameName="protograph-margin">{the_incident.describe_the_event}</p>
                <p>The lynching was {the_incident.was_incident_planned}. {the_incident['did_the_police_intervention_prevent_death?'] === 'Yes' ? (`The police intervened in time to prevent deaths.`) : ''}</p>
                <sup>Casualties</sup>
                <p classNameName="protograph-margin">{the_incident.count_injured} victims were injured and {the_incident.count_dead} victims were left dead.</p>
                <sup>More details about the state</sup>
                <p classNameName="protograph-margin">
                  At the time of the incident, a {when_and_where_it_occur.party_whose_chief_minister_is_in_power} Chief Minister was in power. The police to population ratio in the state is {when_and_where_it_occur.police_to_population_in_state}. The judge to population ratio in the state is {when_and_where_it_occur.judge_to_population_in_state}
                </p>
              </div>
              <div classNameName="eight wide column">
                {copy_paste_from_article.image !== '' ? <img classNameName="image-area protograph-margin" src={copy_paste_from_article.image} style={{width: '100%'}}/> : <div classNameName="no-image-div protograph-margin"></div>}
                {the_people_involved.victim_names !== '' ? <div><sup>VICTIMS</sup>
                  <p classNameName="protograph-margin">{the_people_involved.victim_names}</p></div> : ''}
                {the_people_involved.accused_names !== '' ? <div><sup>ACCUSED</sup>
                  <p classNameName="protograph-margin">{the_people_involved.accused_names}</p></div> : ''}
                <sup>SOURCE</sup>
                <p classNameName="protograph-further-reading protograph-margin"><a href={copy_paste_from_article.url} target="_blank">{copy_paste_from_article.headline}</a></p>
              </div>
            </div>
            <div classNameName="protograph-footer" style={{marginTop: '15px'}}>
              <div classNameName="protograph-credits"><a classNameName="protograph-card-link" href="https://protograph.pykih.com/card/toreportviolence" target="_blank">toReportViolence</a></div>
            </div>
          </div>
        </div>
      )
    }
  }

  renderOldMobile(readMoreEnabled) {
    if (this.state.schemaJSON === undefined ){
      return(<div>Loading</div>)
    } else {
      const data = this.state.dataJSON.data;
      let copy_paste_from_article = data.copy_paste_from_article,
        when_and_where_it_occur = data.when_and_where_it_occur,
        the_incident = data.the_incident,
        the_people_involved = data.the_people_involved,
        hate_crime = data.hate_crime,
        addendum = data.addendum;
      let styles = this.state.optionalConfigJSON ? {backgroundColor: this.state.optionalConfigJSON.background_color} : undefined;
      styles['width'] = '300px';
      let more_content = 
        <div>
          <sup>Casualties</sup>
          <p classNameName="protograph-margin">{the_incident.count_injured} victims were injured and {the_incident.count_dead} victims were left dead.</p>
          {the_people_involved.victim_names !== '' ? <div><sup>VICTIMS</sup>
          <p classNameName="protograph-margin">{the_people_involved.victim_names}</p></div> : ''}
          {the_people_involved.accused_names !== '' ? <div><sup>ACCUSED</sup>
          <p classNameName="protograph-margin">{the_people_involved.accused_names}</p></div> : ''}
          <sup>More details about the state</sup>
          <p classNameName="protograph-margin">
            At the time of the incident, a {when_and_where_it_occur.party_whose_chief_minister_is_in_power} Chief Minister was in power. The police to population ratio in the state is {when_and_where_it_occur.police_to_population_in_state}. The judge to population ratio in the state is {when_and_where_it_occur.judge_to_population_in_state}
          </p>
          <sup>SOURCE</sup>
          <p classNameName="protograph-further-reading protograph-margin"><a href={copy_paste_from_article.url} target="_blank">{copy_paste_from_article.headline}</a></p>
        </div>
      return (
        <div id="protograph-div" style = {styles}>
          <div classNameName="protograph-card">
            <h3 classNameName="ui header">{the_people_involved.title}</h3>
            <h6 classNameName="ui header">{when_and_where_it_occur.area}, {when_and_where_it_occur.district}, {when_and_where_it_occur.state} ({when_and_where_it_occur.area_classNameification})</h6>
            <h6 classNameName='ui header'>{when_and_where_it_occur.approximate_date_of_incident}</h6>
            <br/>
            {copy_paste_from_article.image !== '' ? <img classNameName="image-area protograph-margin" src={copy_paste_from_article.image} style={{width: '100%'}}/> : ''}
            <sup>WHAT HAPPENED?</sup>
            <p classNameName="what-happened">{the_incident.describe_the_event}</p>
            <p>The lynching was {the_incident.was_incident_planned}. {the_incident['did_the_police_intervention_prevent_death'] === 'Yes' ? (`The police intervened in time to prevent deaths.`) : ''}</p>
            {readMoreEnabled ? <button id="read-more-button" classNameName="protograph-read-more" onClick={(e) => this.handleReadMoreClick(e)}>View more</button> : '' }
            {readMoreEnabled ? <div classNameName='hide-content'>{more_content}</div> : (more_content)}
            <div classNameName="protograph-footer">
              <div classNameName="protograph-credits"><a classNameName="protograph-card-link" href="https://protograph.pykih.com/card/toreportviolence" target="_blank">toReportViolence</a></div>
            </div>
          </div>
        </div>
      )
    }
  }

  renderScreenshot() {
    if (this.state.schemaJSON === undefined ){
      return(<div>Loading</div>)
    } else {
      const data = this.state.dataJSON.data;
      let copy_paste_from_article = data.copy_paste_from_article,
        when_and_where_it_occur = data.when_and_where_it_occur,
        the_incident = data.the_incident,
        the_people_involved = data.the_people_involved,
        hate_crime = data.hate_crime,
        addendum = data.addendum;
      let styles = this.state.optionalConfigJSON ? {backgroundColor: this.state.optionalConfigJSON.background_color} : undefined;
      return (
        <div id="ProtoScreenshot" style = {styles}>
          <div classNameName="protograph-card">
            <h3 classNameName="ui header">{the_people_involved.title}</h3>
            <h6 classNameName="ui header">{when_and_where_it_occur.area}, {when_and_where_it_occur.district}, {when_and_where_it_occur.state} ({when_and_where_it_occur.area_classNameification})</h6>
            <h6 classNameName='ui header'>{when_and_where_it_occur.approximate_date_of_incident}</h6>
            <br/>
            {copy_paste_from_article.image !== '' ? <img classNameName="image-area protograph-margin" src={copy_paste_from_article.image} style={{width: '100%'}}/> : ''}
            <sup>WHAT HAPPENED?</sup>
            <p classNameName="protograph-margin">{the_incident.describe_the_event}</p>
            <sup>Casualties</sup>
            <p classNameName="protograph-margin">{the_incident.count_injured} victims were injured and {the_incident.count_dead} victims were left dead.</p>
            {the_people_involved.victim_names !== '' ? <div><sup>VICTIMS</sup>
              <p classNameName="protograph-margin">{the_people_involved.victim_names}</p></div> : ''}
            {the_people_involved.accused_names !== '' ? <div><sup>ACCUSED</sup>
              <p classNameName="protograph-margin">{the_people_involved.accused_names}</p></div> : ''}
            <sup>More details about the state</sup>
            <p classNameName="protograph-margin">
              At the time of the incident, a {when_and_where_it_occur.party_whose_chief_minister_is_in_power} Chief Minister was in power. The police to population ratio in the state is {when_and_where_it_occur.police_to_population_in_state}. The judge to population ratio in the state is {when_and_where_it_occur.judge_to_population_in_state}
            </p>
            <sup>SOURCE</sup>
            <p classNameName="protograph-further-reading"><a href={copy_paste_from_article.url} target="_blank">{copy_paste_from_article.headline}</a></p>
          </div>
        </div>
      )
    }
  }

  render() {
    switch(this.props.mode) {
      case 'laptop' :
        return this.renderLaptop();
      case 'mobile' :
        return this.renderMobile(this.props.readMoreEnabled);
      case 'screenshot' :
        return this.renderScreenshot();
    }
  }
}
 