import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ReportViolenceCard from './Container.jsx';
import JSONSchemaForm from '../../lib/js/react-jsonschema-form';

export default class EditReportViolenceCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 1,
      dataJSON: {
        data: {}
      },
      uiSchemaJSON: {},
      mode: "laptop",
      publishing: false,
      errorOnFetchingData: undefined,
      schemaJSON: undefined,
      optionalConfigJSON: {},
      optionalConfigSchemaJSON: undefined,
      readMoreEnabled: true
    }
    this.toggleMode = this.toggleMode.bind(this);
  }

  exportData() {
    let getDataObj = {
      step: this.state.step,
      dataJSON: this.state.dataJSON,
      schemaJSON: this.state.schemaJSON,
      optionalConfigJSON: this.state.dataJSON.configs,
      optionalConfigSchemaJSON: this.state.optionalConfigSchemaJSON
    }
    getDataObj["name"] = getDataObj.dataJSON.data.the_people_involved.title.substr(0,225); // Reduces the name to ensure the slug does not get too long
    return getDataObj;
  }

  componentDidMount() {
    if (typeof this.props.dataURL === "string"){
      axios.all([axios.get(this.props.dataURL), axios.get(this.props.schemaURL), axios.get(this.props.optionalConfigURL), axios.get(this.props.optionalConfigSchemaURL),  axios.get(this.props.uiSchemaURL)])
        .then(axios.spread((card, schema, opt_config, opt_config_schema, uiSchema) => {
          this.setState({
            dataJSON: {
              data: card.data.data
            },
            schemaJSON: schema.data,
            optionalConfigJSON: opt_config.data,
            optionalConfigSchemaJSON: opt_config_schema.data,
            uiSchemaJSON: uiSchema.data
          });
        }))
        .catch((error) => {
          this.setState({
            errorOnFetchingData: true
          })
        });
    }
  }

  getSchemaJSON() {
    switch(this.state.step){
      case 1:
        return this.state.schemaJSON.properties.data.properties.copy_paste_from_article;
        break;
      case 2:
        return this.state.schemaJSON.properties.data.properties.when_and_where_it_occur;
        break;
      case 3:
        return this.state.schemaJSON.properties.data.properties.the_incident;
        break;
      case 4:
        return this.state.schemaJSON.properties.data.properties.the_people_involved;
        break;
      case 5:
        return this.state.schemaJSON.properties.data.properties.hate_crime;
        break;
      case 6:
        return this.state.schemaJSON.properties.data.properties.addendum;
        break;
      case 7:
        return this.state.optionalConfigSchemaJSON;
        break;
    }
  }

  getFormData() {
    switch(this.state.step) {
      case 1:
        return this.state.dataJSON.data.copy_paste_from_article;
        break;
      case 2:
        return this.state.dataJSON.data.when_and_where_it_occur;
        break;
      case 3:
        return this.state.dataJSON.data.the_incident;
        break;
      case 4:
        return this.state.dataJSON.data.the_people_involved;
        break;
      case 5:
        return this.state.dataJSON.data.hate_crime;
        break;
      case 6:
        return this.state.dataJSON.data.addendum;
        break;
      case 7:
        return this.state.optionalConfigJSON;
        break;
    }
  }

  getUISchemaJSON() {
    switch(this.state.step) {
      case 1:
        return {}
        break;
      case 2:
        return this.state.uiSchemaJSON.data.when_and_where_it_occur;
        break;
      case 3:
        return this.state.uiSchemaJSON.data.the_incident;
        break;
      case 4:
        return this.state.uiSchemaJSON.data.the_people_involved;
        break;
      case 5:
        return this.state.uiSchemaJSON.data.hate_crime;
        break;
      case 6:
        return this.state.uiSchemaJSON.data.addendum;
        break;
      default:
        return {};
        break;
    }
  }

  onChangeHandler({formData}) {
    switch (this.state.step) {
      case 1:
        this.setState((prevStep, prop) => {
          let dataJSON = prevStep.dataJSON;
          dataJSON.data.copy_paste_from_article = formData
          return {
            dataJSON: dataJSON
          }
        })
        break;
      case 2:
        this.setState((prevStep, prop) => {
          let dataJSON = prevStep.dataJSON;
          dataJSON.data.when_and_where_it_occur = formData
          return {
            dataJSON: dataJSON
          }
        })
        break;
      case 3:
        this.setState((prevStep, prop) => {
          let dataJSON = prevStep.dataJSON;
          dataJSON.data.the_incident = formData
          return {
            dataJSON: dataJSON
          }
        })
        break;
      case 4:
        this.setState((prevStep, prop) => {
          let dataJSON = prevStep.dataJSON;
          dataJSON.data.the_people_involved = formData
          return {
            dataJSON: dataJSON
          }
        })
        break;
      case 5:
        this.setState((prevStep, prop) => {
          let dataJSON = prevStep.dataJSON;
          dataJSON.data.hate_crime = formData
          return {
            dataJSON: dataJSON
          }
        })
        break;
      case 6:
        this.setState((prevStep, prop) => {
          let dataJSON = prevStep.dataJSON;
          dataJSON.data.addendum = formData
          return {
            dataJSON: dataJSON
          }
        })
        break;
      case 7:
        this.setState((prevStep, prop) => {
          return {
            optionalConfigJSON: formData
          }
        });
        break;
    }
  }

  onSubmitHandler({formData}) {
    switch(this.state.step) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
        this.setState((prevStep, prop) => {
          return {
            step: prevStep.step + 1
          }
        });
        break;
      case 7:
        if (typeof this.props.onPublishCallback === "function") {
          this.setState({ publishing: true });
          let publishCallback = this.props.onPublishCallback();
          publishCallback.then((message) => {
            this.setState({ publishing: false });
          });
        }
        break;
    }
  }

  showLinkText() {
    switch(this.state.step) {
      case 1:
        return '';
        break;
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        return '< Back';
        break;
    }
  }

  showButtonText() {
    switch(this.state.step) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
        return 'Next';
        break;
      case 7:
        return 'Publish';
        break;
    }
  }

  onPrevHandler() {
    let prev_step = --this.state.step;
    this.setState({
      step: prev_step
    });
  }

  toggleMode(e) {
    let element = e.target.closest('a'),
      mode = element.getAttribute('data-mode');
    this.setState((prevState, props) => {
      let newMode;
      if (mode !== prevState.mode) {
        newMode = mode;
      } else {
        newMode = prevState.mode
      }

      return {
        mode: newMode
      }
    })
  }

  renderSEO() {
    let seo_blockquote = `<blockquote><h3>${this.state.dataJSON.data.the_people_involved.title}</h3><p>${this.state.dataJSON.data.when_and_where_it_occur.state}</p><p>${this.state.dataJSON.data.when_and_where_it_occur.area}</p></blockquote>`
    return seo_blockquote;
  }


  render() {
    if (this.state.schemaJSON === undefined) {
      return(
        <div className="protograph-loader-container">
          {
            !this.state.errorOnFetchingData ?
              "Loading"
            :
              <div className="ui basic message">
                <div className="header">
                  Failed to load resources
                </div>
                <p>Try clearing your browser cache and refresh the page.</p>
              </div>
          }
        </div>
      )
    } else {
      return (
        <div className="proto-container">
          <div className="ui grid form-layout">
            <div className="row">
              <div className="four wide column proto-card-form">
                <div>
                  <div className="section-title-text">Fill the form</div>
                  <div className="ui label proto-pull-right">
                    toReportViolence
                  </div>
                </div>
                <JSONSchemaForm
                  schema= {this.getSchemaJSON()}
                  onSubmit={((e) => this.onSubmitHandler(e))}
                  onChange={((e) => this.onChangeHandler(e))}
                  formData = {this.getFormData()}
                  uiSchema={this.getUISchemaJSON()}
                  >
                  <a id="protograph-prev-link" className={`${this.state.publishing ? 'protograph-disable' : ''}`} onClick={((e) => this.onPrevHandler(e))}>{this.showLinkText()} </a>
                  <button type="submit" className={`${this.state.publishing ? 'ui primary loading disabled button' : ''} default-button protograph-primary-button`}>{this.showButtonText()}</button>
                </JSONSchemaForm>
              </div>
              <div className="twelve wide column proto-card-preview proto-share-card-div">
                <div className="protograph-menu-container">
                  <div className="ui compact menu">
                    <a className={`item ${this.state.mode === 'laptop' ? 'active' : ''}`}
                      data-mode='laptop'
                      onClick={this.toggleMode}
                    >
                      <i className="desktop icon"></i>
                    </a>
                    <a className={`item ${this.state.mode === 'mobile' ? 'active' : ''}`}
                      data-mode='mobile'
                      onClick={this.toggleMode}
                    >
                      <i className="mobile icon"></i>
                    </a>
                  </div>
                </div>
                <ReportViolenceCard
                  readMoreEnabled={this.state.readMoreEnabled}
                  mode={this.state.mode}
                  dataJSON={this.state.dataJSON}
                  schemaJSON={this.state.schemaJSON}
                  optionalConfigJSON={this.state.optionalConfigJSON}
                  optionalConfigSchemaJSON={this.state.optionalConfigSchemaJSON}
                />
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}