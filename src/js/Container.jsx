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
      const data = this.state.dataJSON.card_data;
      let styles =this.state.dataJSON.configs ? {backgroundColor: this.state.dataJSON.configs.background_color} : undefined;
      return (
        <div id="protograph-div" className="protograph-tooltip desktop-view" style = {styles}>
          <div className="card">
            <div className='date'>{data.data.date}</div>
            <div className="card-header">
              <div className="card-title">{data.data.title}</div>
            </div>
            <div className="first-set-info">
              <div className="information-set bottom-border">
                <div className="card-lable">Location</div>
                <div className="card-text">{data.data.area}, {data.data.state} ({data.data.state_ruling_party} ruled)</div>
              </div>
              <div className="information-set bottom-border">
               {data.data.victim_names !== '' ? <div><div className="card-lable">Names of the victims</div><div className="card-text">{data.data.victim_names}</div></div> : ''}
              </div>
              <div className="information-set bottom-border">
                <div className="card-lable">What were the victims doing?</div>
                <div className="card-text">{data.data.victim_religion} {data.data.victim_gender} {data.data.victim_tag} {data.data.victim_action}</div>
              </div>
              {data.data.accused_names !== '' ? <div className="information-set bottom-border"><div className="card-lable">Names of the accused</div><div className="card-text">{data.data.accused_names}</div></div> : ''}
              <div className="information-set bottom-border">
                <div className="card-lable">What was the mob doing?</div>
                <div className="card-text">{data.data.accused_religion} {data.data.accused_gender} {data.data.accused_tag} {data.data.accused_action}</div>
              </div>
              <div className="information-set">
                <div className="card-lable">Was it illegal?</div>
                <div className="card-text">The mob broke the law.
                  {data.data.does_the_state_criminalise_victims_actions === 'No' ? '' : <span> The victims actions were also possibly illegal because {data.data.which_law}</span>
                  }
                </div>
              </div>
            </div>
            <div className="first-set-info">
              {data.data.image ? <div><img className="image-area" src={data.data.image}/></div> : ''}
              <div className="information-set bottom-border">
                <div className="card-lable">What happened?</div>
                <div className="card-text">{data.data.the_lynching}<br/><br/> {data.data.count_injured} victims were injured and {data.data.count_dead} victims were left dead.</div>
              </div>
              <div className="information-set">
                <div className="card-lable">Further Reading</div>
                <div className="card-text"><a id="t-further-reading" href={data.data.url} target="_blank">{data.data.url}</a></div>
              </div>
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
      // console.log(data, "data");
      let styles =this.state.dataJSON.configs ? {backgroundColor: this.state.dataJSON.configs.background_color} : undefined;
      return (
        <div id="protograph-div" className="protograph-tooltip" style = {styles}>
          <div className="t-date">{data.data.date}</div>
          <div className="t-title">{data.data.title}</div>
          <div className="t-location">{data.data.area}, {data.data.state} ({data.data.state_ruling_party} ruled)</div>
          {data.data.image ? <img className="t-image" src={data.data.image}/> : ''}
          <div className="t-section">
            <div className="t-header">What were the victims doing?</div>
            <div className="t-p">
              {data.data.victim_religion} {data.data.victim_gender} {data.data.victim_tag} {data.data.victim_action}
            </div>
          </div>
          {data.data.image ? <div id="first-read" className="t-read-more first-read-more" onClick={(e) => this.handleFirstReadMoreClick(e)}>Read More</div> : ''}
          <div className={data.data.image ? 't-after-first-read-more': 't-not-after-first-read-more'}>
            {data.data.victim_names !== '' ? <div className="t-section"><div className="t-header">Names of the victims</div>
            <div className="t-p">{data.data.victim_names}</div></div> : ''}
            <div className="t-section">
              <div className="t-header">What was the mob doing?</div>
              <div className="t-p">
                {data.data.accused_religion} {data.data.accused_gender} {data.data.accused_tag} {data.data.accused_action}
              </div>
            </div>
            {data.data.image ? '' : <div className="t-read-more second-read-more" onClick={(e) => this.handleSecondReadMoreClick(e)}>Read More</div> }
            <div className={data.data.image ? 't-not-after-second-read-more' : 't-after-second-read-more' }>
              {data.data.accused_names !== '' ? <div className="t-section"><div className="t-header">Names of the accused</div>
              <div className="t-p">{data.data.accused_names}</div></div>: ''}
              <div className="t-section">
                <div className="t-header">Was it illegal?</div>
                <div className="t-p">
                The mob broke the law.
                {data.data.does_the_state_criminalise_victims_actions === 'No' ? '' : <span> The victims actions were also possibly illegal because {data.data.which_law}</span>
                }
                </div>
              </div>
              <div className="t-section">
                <div className="t-header">What happened?</div>
                <div className="t-p">{data.data.the_lynching}</div>
                <div className="t-p t-padup">{data.data.count_injured} victims were injured and {data.data.count_dead} victims were left dead.
                </div>
              </div>
              <div className="t-section">
                <div className="t-header">Further Reading</div>
                <div className="t-p t-padup"><a id="t-further-reading" href={data.data.url} target="_blank">{data.data.url}</a></div>
              </div>
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
        <div id='ProtoScreenshot'>
          <div id="protograph-div" className="protograph-tooltip" style = {styles}>
          <div className="t-date">{data.data.date}</div>
          <div className="t-title">{data.data.title}</div>
          <div className="t-location">{data.data.area}, {data.data.state} ({data.data.state_ruling_party} ruled)</div>
          {data.data.image ? <img className="t-image" src={data.data.image}/> : ''}
          <div className="t-section">
            <div className="t-header">What were the victims doing?</div>
            <div className="t-p">
              {data.data.victim_religion} {data.data.victim_gender} {data.data.victim_tag} {data.data.victim_action}
            </div>
          </div>
          {data.data.image ? <div id="first-read" className="t-read-more first-read-more" onClick={(e) => this.handleFirstReadMoreClick(e)}>Read More</div> : ''}
          <div className={data.data.image ? 't-after-first-read-more': 't-not-after-first-read-more'}>
            {data.data.victim_names !== '' ? <div className="t-section"><div className="t-header">Names of the victims</div>
            <div className="t-p">{data.data.victim_names}</div></div> : ''}
            <div className="t-section">
              <div className="t-header">What was the mob doing?</div>
              <div className="t-p">
                {data.data.accused_religion} {data.data.accused_gender} {data.data.accused_tag} {data.data.accused_action}
              </div>
            </div>
            {data.data.image ? '' : <div className="t-read-more second-read-more" onClick={(e) => this.handleSecondReadMoreClick(e)}>Read More</div> }
            <div className={data.data.image ? 't-not-after-second-read-more' : 't-after-second-read-more' }>
              {data.data.accused_names !== '' ? <div className="t-section"><div className="t-header">Names of the accused</div>
              <div className="t-p">{data.data.accused_names}</div></div>: ''}
              <div className="t-section">
                <div className="t-header">Was it illegal?</div>
                <div className="t-p">
                The mob broke the law.
                {data.data.does_the_state_criminalise_victims_actions === 'No' ? '' : <span> The victims actions were also possibly illegal because {data.data.which_law}</span>
                }
                </div>
              </div>
              <div className="t-section">
                <div className="t-header">What happened?</div>
                <div className="t-p">{data.data.the_lynching}</div>
                <div className="t-p t-padup">{data.data.count_injured} victims were injured and {data.data.count_dead} victims were left dead.
                </div>
              </div>
              <div className="t-section">
                <div className="t-header">Further Reading</div>
                <div className="t-p t-padup"><a id="t-further-reading" href={data.data.url} target="_blank">{data.data.url}</a></div>
              </div>
            </div>
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