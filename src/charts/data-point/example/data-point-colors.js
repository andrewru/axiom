import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Example, Snippet } from 'style-guide';
import { DataPoint, DataPoints, Grid, GridCell } from 'bw-axiom';

export default class DataPointExample extends Component {
  static propTypes = {
    components: PropTypes.shape({
      DataPoint: PropTypes.shape({
        color: PropTypes.shape({
          values: PropTypes.array.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  };

  render() {
    const { components } = this.props;
    const { DataPoint: { color } } = components;

    return (
      <Example name="Single DataPoint">
        <Snippet>
          <Grid gutters="tiny" responsive={ false } snippetIgnore="ignore">
            { color.values.map((color) =>
              <GridCell key={ color } shrink={ true } snippetIgnore="ignore">
                <DataPoints height="2rem" snippetIgnore="ignore">
                  <DataPoint color={ color } />
                </DataPoints>
              </GridCell>
            ) }
          </Grid>
        </Snippet>
      </Example>
    );
  }
}

