import React from 'react';
import ReactDOM from 'react-dom';
import ReportViolenceCard from './src/js/Container.jsx';

window.ProtoGraph = window.ProtoGraph || {};
window.ProtoGraph.Card = window.ProtoGraph.Card || {};


ProtoGraph.Card.toReportViolence = function () {
  this.cardType = 'ReportViolenceCard';
}

ProtoGraph.Card.toReportViolence.prototype.init = function (options) {
  this.options = options;
}

ProtoGraph.Card.toReportViolence.prototype.getData = function (data) {
  return this.containerInstance.exportData();
}

ProtoGraph.Card.toReportViolence.prototype.renderLaptop = function (data) {
  this.mode = 'laptop';
  ReactDOM.render(
    <ReportViolenceCard
      dataURL={this.options.data_url}
      schemaURL={this.options.schema_url}
      optionalConfigURL={this.options.configuration_url}
      optionalConfigSchemaURL={this.options.configuration_schema_url}
      mode={this.mode}
      clickCallback={this.options.onClickCallback}
      ref={(e) => {
        this.containerInstance = this.containerInstance || e;
      }}/>,
    this.options.selector);
}

ProtoGraph.Card.toReportViolence.prototype.renderMobile = function (data) {
  this.mode = 'mobile';
  ReactDOM.render(
    <ReportViolenceCard
      dataURL={this.options.data_url}
      schemaURL={this.options.schema_url}
      optionalConfigURL={this.options.configuration_url}
      optionalConfigSchemaURL={this.options.configuration_schema_url}
      mode={this.mode}
      clickCallback={this.options.onClickCallback}
      ref={(e) => {
        this.containerInstance = this.containerInstance || e;
      }}/>,
    this.options.selector);
}

ProtoGraph.Card.toReportViolence.prototype.renderScreenshot = function (data) {
  this.mode = 'screenshot';
  ReactDOM.render(
    <ReportViolenceCard
      dataURL={this.options.data_url}
      schemaURL={this.options.schema_url}
      optionalConfigURL={this.options.configuration_url}
      optionalConfigSchemaURL={this.options.configuration_schema_url}
      mode={this.mode}
      ref={(e) => {
        this.containerInstance = this.containerInstance || e;
      }}/>,
    this.options.selector);
}

