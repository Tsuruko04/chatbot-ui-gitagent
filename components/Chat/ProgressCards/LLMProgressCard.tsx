import * as React from 'react';
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import {LLMUsage, ToolUsage} from "@/types/chat";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));



const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface LLMProgressCardProps {
  data: LLMUsage
}

const LLMProgressCard = (props: LLMProgressCardProps) => {
  const [expanded, setExpanded] = React.useState(false);
  const [scratchpadDialogOpen, setScratchpadDialogOpen] = React.useState(false);
  var data = props.data;
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleScratchpadOpen = () => {
    setScratchpadDialogOpen(true);
  }

  const handleScratchpadClose = () => {
    setScratchpadDialogOpen(false);
  }

  return (
    <Box sx={{
      // set margin left
      m: 0.5,
      ml: 1
    }}>
      <Card sx={{
        // set background color
        bgcolor: '#',
        //set min width
        minWidth: '600px',
      }}>
        <CardHeader
          avatar={
            <SmartToyIcon/>
          }
          action={
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon/>
            </ExpandMore>
          }
          title={<Typography paragraph sx={{
            fontWeight: 'bold',
            m: 0,
          }}>
            {"Inferencing LLaMA - " + data.occurence}
          </Typography>}
          subheader={
            <Typography paragraph sx={{
              // remove margin
              m: 0,
              //Italicize text
              fontStyle: 'italic',
            }}>
              {data.input ?
                (data.input.length > 50 ? data.input.substring(0, 50) + "..." : data.input)
                : "Not available"}
            </Typography>}
          sx={{
            // left align title
            textAlign: 'left',
          }}
          disableTypography
        />
        <Collapse in={expanded} timeout="auto" unmountOnExit sx={{
          // left align text
          textAlign: 'left',
          // slightly lighter text opacity
          opacity: 0.6,
        }}>
          <CardContent sx={{
            // remove top padding
            pt: 0,
          }}>
            {/*Bolded title that says LLM Input: "*/}
            {data.input ? (
              <>
                <Typography paragraph sx={{
                  // bold text
                  fontWeight: 'bold',
                  // remove margin
                  m: 0,
                }}>LLM Input: </Typography>
                <Typography paragraph>
                  {data.input}
                </Typography>
              </>
            ) : (
              <></>
            )}

            {data.response ? (
              <>
                <Typography paragraph sx={{
                  // bold text
                  fontWeight: 'bold',
                  // remove margin
                  m: 0,
                }}>LLM Response: </Typography>
                <Typography paragraph sx={{
                }}>
                  {data.response}
                </Typography>
              </>
            ) : (
              <>
                <Typography paragraph sx={{
                  // bold text
                  fontWeight: 'bold',
                  // remove margin
                  m: 0,
                }}>LLM Response: </Typography>
                <Typography paragraph sx={{
                }}>
                  Waiting for response...
                </Typography>
              </>
            )}

            {data.agent_scratchpad? (
              // make a button that says "Show Scratchpad", and when clicked, opens a dialog box with the scratchpad
              <>
                <Button variant="outlined"
                        onClick={() => handleScratchpadOpen()}
                >Show Agent Scratchpad</Button>
                <Dialog
                  open={scratchpadDialogOpen}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleScratchpadClose}
                >
                  <DialogTitle>{"Agent Scratchpad up to Stage " + data.occurence}</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      {data.agent_scratchpad}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleScratchpadClose}>Close</Button>
                  </DialogActions>
                </Dialog>

              </>
            ): (
              <></>
            )}


          </CardContent>
        </Collapse>
      </Card>
    </Box>

  );
}

export default LLMProgressCard;