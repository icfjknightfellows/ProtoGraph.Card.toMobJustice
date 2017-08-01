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
        card_data: {},
        configs: {}
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

  componentDidMount() {
    // get sample json data based on type i.e string or object
    if (this.state.fetchingData){
      axios.all([axios.get(this.props.dataURL), axios.get(this.props.schemaURL), axios.get(this.props.optionalConfigURL), axios.get(this.props.optionalConfigSchemaURL)])
        .then(axios.spread((card, schema, opt_config, opt_config_schema) => {
          this.setState({
            fetchingData: false,
            dataJSON: {
              card_data: card.data,
              configs: opt_config.data
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
      const data = this.state.dataJSON.card_data;
      let styles = this.state.dataJSON.configs ? {backgroundColor: this.state.dataJSON.configs.background_color} : undefined;
      return (
        <div id="protograph-div" style = {styles}>
          <div className="protograph-card">
            <div className="ui grid">
              <div className="sixteen wide column">
                <h3 className="ui header">{data.data.title}</h3>
                <h6 className="ui header">{data.data.area}, {data.data.district}, {data.data.state} ({data.data.area_classification})</h6>
                <h6 className='ui header'>{data.data.date}</h6>
              </div>
              <div className="eight wide column" style={{paddingRight: '30px'}}>
                <sup>WHAT HAPPENED?</sup>
                <p className="protograph-margin">{data.data.victim_religion} {data.data.victim_tag} {data.data.victim_gender !=='' ? (`(${data.data.victim_gender})`): '' } {data.data.victim_action} {data.data.accused_religion} {data.data.accused_tag} {data.data.accused_gender !=='' ? (`(${data.data.accused_gender})`): '' } {data.data.accused_action} {data.data.the_lynching}</p>
                <p>The lynching was {data.data.how_was_the_lynching_planned}. {data.data['did_the_police_intervene_and_prevent_the_death?'] === 'Yes' ? (`The police intervened in time to prevent deaths.`) : ''}</p>
                <sup>Casualties</sup>
                <p className="protograph-margin">{data.data.count_injured} victims were injured and {data.data.count_dead} victims were left dead.</p>
                {data.data.does_the_state_criminalise_victims_actions === 'Yes' ? <div><sup>LEGAL</sup><p className="protograph-margin"><span> If the allegation on the victim were true, then it would be a punishable offence.</span></p></div> : ''}
                <sup>More details about the state</sup>
                <p className="protograph-margin">
                  At the time of the incident, a {data.data.state_ruling_party} Chief Minister was in power. The police to population ratio in the state is {data.data.police_to_population}. The judge to population ratio in the state is {data.data.judge_to_population}
                </p>
              </div>
              <div className="eight wide column">
                {data.data.image !== '' ? <img className="image-area protograph-margin" src={data.data.image} style={{width: '100%'}}/> : <div className="no-image-div protograph-margin"></div>}
                {data.data.victim_names !== '' ? <div><sup>VICTIMS</sup>
                  <p className="protograph-margin">{data.data.victim_names}</p></div> : ''}
                {data.data.accused_names !== '' ? <div><sup>ACCUSED</sup>
                  <p className="protograph-margin">{data.data.accused_names}</p></div> : ''}
                <sup>SOURCE</sup>
                <p className="protograph-further-reading protograph-margin"><a href={data.data.url} target="_blank">{data.data.headline}</a></p>
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

  renderMobile() {
    if (this.state.schemaJSON === undefined ){
      return(<div>Loading</div>)
    } else {
      const data = this.state.dataJSON.card_data;
      let styles = this.state.dataJSON.configs ? {backgroundColor: this.state.dataJSON.configs.background_color} : undefined;
      console.log(data, data.data['did_the_police_intervene_and_prevent_the_death?'],"data-------")
      styles['width'] = '300px';
      return (
        <div id="protograph-div" style = {styles}>
          <div className="protograph-card">
            <h3 className="ui header">{data.data.title}</h3>
            <h6 className="ui header">{data.data.area}, {data.data.district}, {data.data.state} ({data.data.area_classification})</h6>
            <h6 className='ui header'>{data.data.date}</h6>
            <br/>
            {data.data.image !== '' ? <img className="image-area protograph-margin" src={data.data.image} style={{width: '100%'}}/> : ''}
            <sup>WHAT HAPPENED?</sup>
            <p className="what-happened">{data.data.victim_religion} {data.data.victim_tag} {data.data.victim_gender !=='' ? (`(${data.data.victim_gender})`): '' } {data.data.victim_action} {data.data.accused_religion} {data.data.accused_tag} {data.data.accused_gender !=='' ? (`(${data.data.accused_gender})`): '' } {data.data.accused_action} {data.data.the_lynching}</p>
            <p>The lynching was {data.data.how_was_the_lynching_planned}. {data.data['did_the_police_intervene_and_prevent_the_death?'] === 'Yes' ? (`The police intervened in time to prevent deaths.`) : ''}</p>
            <button id="read-more-button" className="protograph-read-more" onClick={(e) => this.handleReadMoreClick(e)}>View more</button>
            <div className='hide-content'>
              <sup>Casualties</sup>
              <p className="protograph-margin">{data.data.count_injured} victims were injured and {data.data.count_dead} victims were left dead.</p>
              {data.data.does_the_state_criminalise_victims_actions === 'Yes' ? <div><sup>LEGAL</sup><p className="protograph-margin"><span> If the allegation on the victim were true, then it would be a punishable offence.</span></p></div> : ''}
              {data.data.victim_names !== '' ? <div><sup>VICTIMS</sup>
                <p className="protograph-margin">{data.data.victim_names}</p></div> : ''}
              {data.data.accused_names !== '' ? <div><sup>ACCUSED</sup>
                <p className="protograph-margin">{data.data.accused_names}</p></div> : ''}
              <sup>More details about the state</sup>
              <p className="protograph-margin">
                At the time of the incident, a {data.data.state_ruling_party} Chief Minister was in power. The police to population ratio in the state is {data.data.police_to_population}. The judge to population ratio in the state is {data.data.judge_to_population}
              </p>
              <sup>SOURCE</sup>
              <p className="protograph-further-reading protograph-margin"><a href={data.data.url} target="_blank">{data.data.headline}</a></p>
            </div>
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
      const data = this.state.dataJSON.card_data;
      let styles =this.state.dataJSON.configs ? {backgroundColor: this.state.dataJSON.configs.background_color} : undefined;
      return (
        <div id="ProtoScreenshot" style = {styles}>
          <div className="protograph-card">
            <h3 className="ui header">{data.data.title}</h3>
            <h6 className="ui header">{data.data.area}, {data.data.district}, {data.data.state} ({data.data.area_classification})</h6>
            <h6 className='ui header'>{data.data.date}</h6>
            <br/>
            {data.data.image !== '' ? <img className="image-area protograph-margin" src={data.data.image} style={{width: '100%'}}/> : ''}
            <sup>WHAT HAPPENED?</sup>
            <p className="protograph-margin">{data.data.victim_religion} {data.data.victim_tag} {data.data.victim_gender !=='' ? (`(${data.data.victim_gender})`): '' } {data.data.victim_action} {data.data.accused_religion} {data.data.accused_tag} {data.data.accused_gender !=='' ? (`(${data.data.accused_gender})`): '' } {data.data.accused_action} {data.data.the_lynching}</p>
            <sup>Casualties</sup>
            <p className="protograph-margin">{data.data.count_injured} victims were injured and {data.data.count_dead} victims were left dead.</p>
            {data.data.does_the_state_criminalise_victims_actions === 'Yes' ? <div><sup>LEGAL</sup><p className="protograph-margin"><span> If the allegation on the victim were true, then it would be a punishable offence.</span></p></div> : ''}
            {data.data.victim_names !== '' ? <div><sup>VICTIMS</sup>
              <p className="protograph-margin">{data.data.victim_names}</p></div> : ''}
            {data.data.accused_names !== '' ? <div><sup>ACCUSED</sup>
              <p className="protograph-margin">{data.data.accused_names}</p></div> : ''}
            <sup>More details about the state</sup>
            <p className="protograph-margin">
              At the time of the incident, a {data.data.state_ruling_party} Chief Minister was in power. The police to population ratio in the state is {data.data.police_to_population}. The judge to population ratio in the state is {data.data.judge_to_population}
            </p>
            <sup>SOURCE</sup>
            <p className="protograph-further-reading"><a href={data.data.url} target="_blank">{data.data.headline}</a></p>
          </div>
        </div>
      )
    }
  }

  render() {
    switch(this.props.mode) {
      case 'laptop' :
        return this.renderLaptop();
        break;
      case 'mobile' :
        return this.renderMobile();
        break;
      case 'screenshot' :
        return this.renderScreenshot();
        break;
    }
  }
}

// {data.data['did_the_police_intervene_and_prevent_the_death?'] === 'Yes' ? (The police intervened in time to prevent deaths.) : '' }