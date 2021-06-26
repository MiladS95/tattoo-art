import { Button, Grid, Typography, GridList, GridListTile, GridListTileBar, IconButton } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Contest } from '../../interface/Contest';
import { useAuth } from '../../context/useAuthContext';
import { getAllContests } from '../../helpers/APICalls/contest';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import useStyles from './useStyles';
import placeholder from '../../Images/placeholder.jpeg';
export default function Discovery(): JSX.Element {
  const [allContests, setAllContests] = useState<[Contest]>();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const { loggedInUser } = useAuth();
  const classes = useStyles();

  const homePage = 1;

  useEffect(() => {
    async function fetchAllContests() {
      const response = await getAllContests(page);

      if (response) {
        const contests = response.contests;
        setAllContests(contests);
      }
      if (response.totalPage && response.page) {
        setPage(response.page);
        setTotalPage(response.totalPage);
      }
    }
    fetchAllContests();
  }, [page]);

  return (
    <Grid container justify="center" className={classes.container}>
      <Grid item>
        <Typography className={classes.title}>Current Contests</Typography>
      </Grid>
      <Grid container item className={classes.listContainer}>
        <GridList cellHeight={300} className={classes.contestGrid}>
          {allContests ? (
            allContests.map((contest) => (
              <GridListTile key={contest._id}>
                {loggedInUser ? (
                  <Button
                    component={Link}
                    to={`/contest/${contest._id}`}
                    fullWidth={true}
                    disableElevation={true}
                    className={classes.link}
                  >
                    <img
                      src={contest.images[0] ? contest.images[0] : placeholder}
                      alt={contest.title}
                      className={classes.contestImage}
                    />
                  </Button>
                ) : (
                  <Button
                    component={Link}
                    to={'/login'}
                    fullWidth={true}
                    disableElevation={true}
                    className={classes.link}
                  >
                    <img src={contest.images[0]} alt={contest.title} className={classes.contestImage} />
                  </Button>
                )}
                <GridListTileBar
                  title={`$${contest.price}`}
                  titlePosition="bottom"
                  subtitle={contest.title}
                  actionIcon={
                    <IconButton aria-label={`star ${contest.title}`}>
                      <StarBorderIcon />
                    </IconButton>
                  }
                  actionPosition="left"
                />
              </GridListTile>
            ))
          ) : (
            <CircularProgress />
          )}
        </GridList>
      </Grid>
      {page > homePage && (
        <Button
          type="submit"
          disabled={page === 1}
          onClick={() => setPage(page - homePage)}
          variant="contained"
          color="primary"
          className={classes.pageButton}
        >
          Previous Page
        </Button>
      )}

      {page < totalPage && (
        <Button
          type="submit"
          disabled={page >= totalPage}
          onClick={() => setPage(page + homePage)}
          variant="contained"
          color="primary"
          className={classes.pageButton}
        >
          Next Page
        </Button>
      )}
    </Grid>
  );
}
