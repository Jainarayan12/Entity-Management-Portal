import { useEffect, useState } from 'react';
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from '@mui/material';
import useApi from '../../../../../core/api-service/useApi';

const OwnershipTab = () => {
  const [topData, setTopData] = useState([]);
  const [bottomData, setBottomData] = useState([]);

  // const { get } = useApi();

  useEffect(() => {
    const fetchOwnershipData = async () => {
      try {
        // const res = await get('');
        // setTopData(res.data.topSection);
        // setBottomData(res.data.bottomSection);

        const top = [
          {
            nature: 'jai ',
            type: 'developer',
            sharesIssued: '0',
            votingIssued: '2',
            parValue: '3',
            nominalValue: '4',
          },
          {
            nature: 'jai',
            type: 'jai',
            sharesIssued: '1',
            votingIssued: '2',
            parValue: '3',
            nominalValue: '4',
          },
          {
            nature: 'jai ',
            type: 'developer',
            sharesIssued: '0',
            votingIssued: '2',
            parValue: '3',
            nominalValue: '4',
          },
          {
            nature: 'jai',
            type: 'jai',
            sharesIssued: '1',
            votingIssued: '2',
            parValue: '3',
            nominalValue: '4',
          },
          {
            nature: 'jai ',
            type: 'developer',
            sharesIssued: '0',
            votingIssued: '2',
            parValue: '3',
            nominalValue: '4',
          },
          {
            nature: 'jai',
            type: 'jai',
            sharesIssued: '1',
            votingIssued: '2',
            parValue: '3',
            nominalValue: '4',
          },
        ];

        const bottom = [
          {
            owner: 'jai',
            shareType: 'jai',
            sharesIssued: '1',
            intPercent: '2',
            votes: '3',
          },
          {
            owner: 'jai',
            shareType: '1',
            sharesIssued: '2',
            intPercent: '3',
            votes: '5',
          },
          {
            owner: 'jai',
            shareType: '1',
            sharesIssued: '1',
            intPercent: '1',
            votes: '1',
          },
          {
            owner: 'jai',
            shareType: 'jai',
            sharesIssued: '1',
            intPercent: '2',
            votes: '3',
          },
          {
            owner: 'jai',
            shareType: '1',
            sharesIssued: '2',
            intPercent: '3',
            votes: '5',
          },
          {
            owner: 'jai',
            shareType: '1',
            sharesIssued: '1',
            intPercent: '1',
            votes: '1',
          },
        ];

        setTopData(top);
        setBottomData(bottom);
      } catch (err) {
        console.error('Ownership API Error:', err);
      }
    };

    fetchOwnershipData();
  }, []);

  const cellStyles = {
    border: '1px solid #ddd',
    padding: '10px',
    wordWrap: 'break-word',
    whiteSpace: 'normal',
    maxWidth: 160,
  };

  return (
    <Box>
      <TableContainer sx={{ mb: 3 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {[
                'Nature',
                'Type',
                'Shares Issued',
                'Voting Right Issued',
                'Par Value',
                'Nominal Value',
              ].map((head) => (
                <TableCell
                  key={head}
                  sx={{
                    fontWeight: 'bold',
                    color: '#2E2D2C',
                    background: '#FAFAFA',
                    ...cellStyles,
                  }}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {topData.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell sx={{ ...cellStyles }}>{row.nature}</TableCell>
                <TableCell sx={{ ...cellStyles }}>{row.type}</TableCell>
                <TableCell sx={{ ...cellStyles }}>{row.sharesIssued}</TableCell>
                <TableCell sx={{ ...cellStyles }}>{row.votingIssued}</TableCell>
                <TableCell sx={{ ...cellStyles }}>{row.parValue}</TableCell>
                <TableCell sx={{ ...cellStyles }}>{row.nominalValue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              {[
                'Share Owner',
                'Share Type',
                'Shares Issued',
                '% Int',
                'Votes',
              ].map((head) => (
                <TableCell
                  key={head}
                  sx={{
                    fontWeight: 600,
                    color: '#2E2D2C',
                    background: '#E0E0E0',
                    border: '1px solid #ddd',
                    padding: '10px',
                  }}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {bottomData.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell sx={{ ...cellStyles }}>{row.owner}</TableCell>
                <TableCell sx={{ ...cellStyles }}>{row.shareType}</TableCell>
                <TableCell sx={{ ...cellStyles }}>{row.sharesIssued}</TableCell>
                <TableCell sx={{ ...cellStyles }}>{row.intPercent}</TableCell>
                <TableCell sx={{ ...cellStyles }}>{row.votes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OwnershipTab;
