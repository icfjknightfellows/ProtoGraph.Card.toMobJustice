import React from 'react';
import ReactDOM from 'react-dom';
import MobJusticeCard from './src/js/Container.jsx';

window.ProtoGraph = window.ProtoGraph || {};
window.ProtoGraph.Card = window.ProtoGraph.Card || {};


ProtoGraph.Card.toMobJustice = function () {
  this.cardType = 'MobJusticeCard';
}

ProtoGraph.Card.toMobJustice.prototype.init = function (options) {
  this.options = options;
}

ProtoGraph.Card.toMobJustice.prototype.getData = function (data) {
  return this.containerInstance.exportData();
}

ProtoGraph.Card.toMobJustice.prototype.renderLaptop = function (data) {
  this.mode = 'laptop';
  ReactDOM.render(
    <MobJusticeCard
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

ProtoGraph.Card.toMobJustice.prototype.renderMobile = function (data) {
  this.mode = 'mobile';
  ReactDOM.render(
    <MobJusticeCard
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

ProtoGraph.Card.toMobJustice.prototype.renderScreenshot = function (data) {
  this.mode = 'screenshot';
  ReactDOM.render(
    <MobJusticeCard
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

