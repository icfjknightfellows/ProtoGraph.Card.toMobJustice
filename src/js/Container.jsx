import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class MobJusticeCard extends React.Component {
  constructor(props) {
    super(props)
    let stateVar = {
      fetchingData: true,
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

  handleFirstReadMoreClick() {
    document.getElementsByClassName('first-read-more')[0].style.display = 'none'
    document.getElementsByClassName('t-after-first-read-more')[0].style.display = 'block'
    this.props.clickCallback();
  }

  handleSecondReadMoreClick() {
    document.getElementsByClassName('second-read-more')[0].style.display = 'none'
    document.getElementsByClassName('t-after-second-read-more')[0].style.display = 'block'
    this.props.clickCallback();
  }

  renderLaptop() {
    if (this.state.schemaJSON === undefined ){
      return(<div>Loading</div>)
    } else {
      return(<div>Waiting for Laptop mode</div>)
    }
  }

  renderMobile() {
    if (this.state.schemaJSON === undefined ){
      return(<div>Loading</div>)
    } else {
      const data = this.state.dataJSON.card_data;
      // console.log(data, "data");
      let styles =this.state.dataJSON.configs ? {backgroundColor: this.state.dataJSON.configs.background_color} : undefined;
      return (
        <div id="protograph-div" className="protograph-tooltip" style = {styles}>
          <div className="t-date">{data.data.date}</div>
          <div className="t-title">{data.data.title}</div>
          <div className="t-location">{data.data.area}, {data.data.state} ({data.data.state_ruling_party} ruled)</div>
          {data.data.image ? <img className="t-image" src={data.data.image}/> : ''}
          <div className="t-header">What were the victims doing?</div>
          <div className="t-p">
            {data.data.victim_religion} {data.data.victim_gender} {data.data.victim_tag} {data.data.victim_action} 
          </div>
          {data.data.image ? <div id="first-read" className="t-read-more first-read-more" onClick={(e) => this.handleFirstReadMoreClick(e)}>Read More</div> : ''}
          <div className={data.data.image ? 't-after-first-read-more': 't-not-after-first-read-more'}>
            {data.data.victim_names !== '' ? <div><div className="t-header">Names of the victims</div>
            <div className="t-p">{data.data.victim_names}</div></div> : ''}
            <div className="t-header">What was the mob doing?</div>
            <div className="t-p">
              {data.data.accused_religion} {data.data.accused_gender} {data.data.accused_tag} {data.data.accused_action} 
            </div>
            {data.data.image ? '' : <div className="t-read-more second-read-more" onClick={(e) => this.handleSecondReadMoreClick(e)}>Read More</div> }
            <div className={data.data.image ? 't-not-after-second-read-more' : 't-after-second-read-more' }>
              {data.data.accused_names !== '' ? <div><div className="t-header">Names of the accused</div>
              <div className="t-p">{data.data.accused_names}</div></div>: ''}
              <div className="t-header">Was it illegal?</div>
              <div className="t-p">
              The mob broke the law. 
              {data.data.does_the_state_criminalise_victims_actions === 'No' ? '' : <span> The victims actions were also possibly illegal because {data.data.which_law}</span>
              }
              </div>
              <div className="t-header">What happened?</div>
              <div className="t-p">{data.data.the_lynching}</div>
              <div className="t-p t-padup">{data.data.count_injured} victims were injured and {data.data.count_dead} victims were left dead.
              </div>
              <div className="t-header">Further Reading</div>
              <div className="t-p t-padup"><a id="t-further-reading" href={data.data.url} target="_blank">{data.data.url}</a></div>
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
      let screenshot_styles =  {
        height:'auto'
      }
      return (
        <div id="ProtoScreenshot" className="protograph-tooltip"  style={styles}>
          <div className="t-date">{data.data.date}</div>
          <div className="t-title">{data.data.title}</div>
          <div className="t-location">{data.data.area}, {data.data.state} ({data.data.state_ruling_party} ruled)</div>
          {data.data.image ? <img className="t-image" src={data.data.image}/> : ''}
          <div className="t-header">What were the victims doing?</div>
          <div className="t-p">
            {data.data.victim_religion} {data.data.victim_gender} {data.data.victim_tag} {data.data.victim_action} 
          </div>
          {data.data.image ? <div className="t-read-more first-read-more" onClick={(e) => this.handleFirstReadMoreClick(e)}>Read More</div> : ''}
          <div className={data.data.image ? 't-after-first-read-more': 't-not-after-first-read-more'}>
            {data.data.victim_names !== '' ? <div><div className="t-header">Names of the victims</div>
            <div className="t-p">{data.data.victim_names}</div></div> : ''}
            <div className="t-header">What was the mob doing?</div>
            <div className="t-p">
              {data.data.accused_religion} {data.data.accused_gender} {data.data.accused_tag} {data.data.accused_action} 
            </div>
            {data.data.image ? '' : <div className="t-read-more second-read-more" onClick={(e) => this.handleSecondReadMoreClick(e)}>Read More</div> }
            <div className={data.data.image ? 't-not-after-second-read-more' : 't-after-second-read-more' }>
              {data.data.accused_names !== '' ? <div><div className="t-header">Names of the accused</div>
              <div className="t-p">{data.data.accused_names}</div></div>: ''}
              <div className="t-header">Was it illegal?</div>
              <div className="t-p">
              The mob broke the law. 
              {data.data.does_the_state_criminalise_victims_actions === 'No' ? '' : <span> The victims actions were also possibly illegal because {data.data.which_law}</span>
              }
              </div>
              <div className="t-header">What happened?</div>
              <div className="t-p">{data.data.the_lynching}</div>
              <div className="t-p t-padup">{data.data.count_injured} victims were injured and {data.data.count_dead} victims were left dead.
              </div>
              <div className="t-header">Further Reading</div>
              <div className="t-p t-padup"><a id="t-further-reading" href={data.data.url} target="_blank">{data.data.url}</a></div>
            </div>
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