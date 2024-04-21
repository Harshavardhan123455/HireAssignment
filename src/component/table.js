import React from 'react';
import { Component } from 'react';
import {Table, TableContainer, TableRow, TableBody, TableHead, TableCell, Box,Paper,IconButton,Collapse} from '@material-ui/core'
import {KeyboardArrowDown,KeyboardArrowUp} from '@material-ui/icons'
import './table.css'; 

class ItemsTable extends Component {
  state = {
      items: [],
      extendRow: null,
      itemsGrouping: []
    };
  

  componentDidMount() {
    this.callData();
  }

  callData = async () => {
      const response = await fetch('https://canopy-frontend-task.now.sh/api/holdings');
      const data = await response.json();
      this.setState({items : data.payload});
      this.groupitems(data.payload);
  };

  groupitems = (data) => {
    const grouped = {};
    data.forEach((holding) => {
      if (!grouped[holding.asset_class]) {
        grouped[holding.asset_class] = [];
      }
      grouped[holding.asset_class].push(holding);
    });
    this.setState({ itemsGrouping : grouped });
  };

  handClick = (assetClass) => {
    this.setState((prevState) => ({
        extendRow : prevState.extendRow === assetClass ? null : assetClass
    }));
  };

  render() {
    const { extendRow , itemsGrouping } = this.state;

    return (
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {Object.entries(itemsGrouping).map(([assetClass, items], index) => (
              <React.Fragment key={index}>
                <TableRow
                  className={extendRow === assetClass ? 'expanded-row' : 'collapsed-row'}
                  onClick={() => this.handClick(assetClass)}
                >
                  <TableCell>
                    <IconButton size="small">
                      {extendRow === assetClass ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                  </TableCell>
                  <TableCell colSpan={6}>{assetClass} ({items.length})</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                    <Collapse in={extendRow === assetClass} timeout="auto" unmountOnExit>
                      <Box margin={1}>
                        <Table size="small" aria-label="holding-details">
                          <TableHead>
                            <TableRow>
                              <TableCell>Name</TableCell>
                              <TableCell>Ticker</TableCell>
                              <TableCell>Avg Price</TableCell>
                              <TableCell>Market Price</TableCell>
                              <TableCell>Latest Change %</TableCell>
                              <TableCell>Market Value (Base CCY)</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {items.map((holding, index) => (
                              <TableRow key={index}>
                                <TableCell>{holding.name}</TableCell>
                                <TableCell>{holding.ticker}</TableCell>
                                <TableCell>{holding.avg_price}</TableCell>
                                <TableCell>{holding.market_price}</TableCell>
                                <TableCell>{holding.latest_chg_pct}</TableCell>
                                <TableCell>{holding.market_value_ccy}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default ItemsTable;
