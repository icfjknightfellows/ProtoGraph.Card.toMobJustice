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

  renderLaptop() {
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
          <div className="protograph-card">
            <div className="ui grid">
              <div className="sixteen wide column">
                <h3 className="ui header">{the_people_involved.title}</h3>
                <h6 className="ui header">{when_and_where_it_occur.area}, {when_and_where_it_occur.district}, {when_and_where_it_occur.state} ({when_and_where_it_occur.area_classification})</h6>
                <h6 className='ui header'>{when_and_where_it_occur.approximate_date_of_incident}</h6>
              </div>
              <div className="eight wide column" style={{paddingRight: '30px'}}>
                <sup>WHAT HAPPENED?</sup>
                <p className="protograph-margin">{the_incident.describe_the_event}</p>
                <p>The lynching was {the_incident.was_incident_planned}. {the_incident['did_the_police_intervention_prevent_death?'] === 'Yes' ? (`The police intervened in time to prevent deaths.`) : ''}</p>
                <sup>Casualties</sup>
                <p className="protograph-margin">{the_incident.count_injured} victims were injured and {the_incident.count_dead} victims were left dead.</p>
                <sup>More details about the state</sup>
                <p className="protograph-margin">
                  At the time of the incident, a {when_and_where_it_occur.party_whose_chief_minister_is_in_power} Chief Minister was in power. The police to population ratio in the state is {when_and_where_it_occur.police_to_population_in_state}. The judge to population ratio in the state is {when_and_where_it_occur.judge_to_population_in_state}
                </p>
              </div>
              <div className="eight wide column">
                {copy_paste_from_article.image !== '' ? <img className="image-area protograph-margin" src={copy_paste_from_article.image} style={{width: '100%'}}/> : <div className="no-image-div protograph-margin"></div>}
                {the_people_involved.victim_names !== '' ? <div><sup>VICTIMS</sup>
                  <p className="protograph-margin">{the_people_involved.victim_names}</p></div> : ''}
                {the_people_involved.accused_names !== '' ? <div><sup>ACCUSED</sup>
                  <p className="protograph-margin">{the_people_involved.accused_names}</p></div> : ''}
                <sup>SOURCE</sup>
                <p className="protograph-further-reading protograph-margin"><a href={copy_paste_from_article.url} target="_blank">{copy_paste_from_article.headline}</a></p>
              </div>
            </div>
            <div className="protograph-footer" style={{marginTop: '15px'}}>
              <div className="protograph-credits"><a className="protograph-card-link" href="https://protograph.pykih.com/card/toreportviolence" target="_blank">toReportViolence</a></div>
            </div>
          </div>
        </div>
      )
    }
  }

  renderMobile(readMoreEnabled) {
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
          <p className="protograph-margin">{the_incident.count_injured} victims were injured and {the_incident.count_dead} victims were left dead.</p>
          {the_people_involved.victim_names !== '' ? <div><sup>VICTIMS</sup>
          <p className="protograph-margin">{the_people_involved.victim_names}</p></div> : ''}
          {the_people_involved.accused_names !== '' ? <div><sup>ACCUSED</sup>
          <p className="protograph-margin">{the_people_involved.accused_names}</p></div> : ''}
          <sup>More details about the state</sup>
          <p className="protograph-margin">
            At the time of the incident, a {when_and_where_it_occur.party_whose_chief_minister_is_in_power} Chief Minister was in power. The police to population ratio in the state is {when_and_where_it_occur.police_to_population_in_state}. The judge to population ratio in the state is {when_and_where_it_occur.judge_to_population_in_state}
          </p>
          <sup>SOURCE</sup>
          <p className="protograph-further-reading protograph-margin"><a href={copy_paste_from_article.url} target="_blank">{copy_paste_from_article.headline}</a></p>
        </div>
      return (
        <div id="protograph-div" style = {styles}>
          <div className="protograph-card">
            <h3 className="ui header">{the_people_involved.title}</h3>
            <h6 className="ui header">{when_and_where_it_occur.area}, {when_and_where_it_occur.district}, {when_and_where_it_occur.state} ({when_and_where_it_occur.area_classification})</h6>
            <h6 className='ui header'>{when_and_where_it_occur.approximate_date_of_incident}</h6>
            <br/>
            {copy_paste_from_article.image !== '' ? <img className="image-area protograph-margin" src={copy_paste_from_article.image} style={{width: '100%'}}/> : ''}
            <sup>WHAT HAPPENED?</sup>
            <p className="what-happened">{the_incident.describe_the_event}</p>
            <p>The lynching was {the_incident.was_incident_planned}. {the_incident['did_the_police_intervention_prevent_death'] === 'Yes' ? (`The police intervened in time to prevent deaths.`) : ''}</p>
            {readMoreEnabled ? <button id="read-more-button" className="protograph-read-more" onClick={(e) => this.handleReadMoreClick(e)}>View more</button> : '' }
            {readMoreEnabled ? <div className='hide-content'>{more_content}</div> : (more_content)}
            <div className="protograph-footer">
              <div className="protograph-credits"><a className="protograph-card-link" href="https://protograph.pykih.com/card/toreportviolence" target="_blank">toReportViolence</a></div>
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
          <div className="protograph-card">
            <h3 className="ui header">{the_people_involved.title}</h3>
            <h6 className="ui header">{when_and_where_it_occur.area}, {when_and_where_it_occur.district}, {when_and_where_it_occur.state} ({when_and_where_it_occur.area_classification})</h6>
            <h6 className='ui header'>{when_and_where_it_occur.approximate_date_of_incident}</h6>
            <br/>
            {copy_paste_from_article.image !== '' ? <img className="image-area protograph-margin" src={copy_paste_from_article.image} style={{width: '100%'}}/> : ''}
            <sup>WHAT HAPPENED?</sup>
            <p className="protograph-margin">{the_incident.describe_the_event}</p>
            <sup>Casualties</sup>
            <p className="protograph-margin">{the_incident.count_injured} victims were injured and {the_incident.count_dead} victims were left dead.</p>
            {the_people_involved.victim_names !== '' ? <div><sup>VICTIMS</sup>
              <p className="protograph-margin">{the_people_involved.victim_names}</p></div> : ''}
            {the_people_involved.accused_names !== '' ? <div><sup>ACCUSED</sup>
              <p className="protograph-margin">{the_people_involved.accused_names}</p></div> : ''}
            <sup>More details about the state</sup>
            <p className="protograph-margin">
              At the time of the incident, a {when_and_where_it_occur.party_whose_chief_minister_is_in_power} Chief Minister was in power. The police to population ratio in the state is {when_and_where_it_occur.police_to_population_in_state}. The judge to population ratio in the state is {when_and_where_it_occur.judge_to_population_in_state}
            </p>
            <sup>SOURCE</sup>
            <p className="protograph-further-reading"><a href={copy_paste_from_article.url} target="_blank">{copy_paste_from_article.headline}</a></p>
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

// {data.data.does_the_state_criminalise_victims_actions === 'Yes' ? <div><sup>LEGAL</sup><p className="protograph-margin"><span> If the allegation on the victim were true, then it would be a punishable offence.</span></p></div> : ''}
 