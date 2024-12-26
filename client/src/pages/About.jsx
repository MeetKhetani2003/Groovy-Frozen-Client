import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

const AboutUs = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  // Fetch team members from Random User API
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get(
          'https://randomuser.me/api/?results=4'
        );
        setTeamMembers(response.data.results);
      } catch (error) {
        console.error('Error fetching team members:', error);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <Container maxWidth="lg" className="pt-20">
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: 'center',
          py: 5,
          borderRadius: 3,
        }}
      >
        <Typography variant="h3" gutterBottom>
          About Us
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Learn more about who we are, our mission, and our vision.
        </Typography>
      </Box>

      {/* Mission, Vision, Values Section */}
      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ textAlign: 'center', p: 2, boxShadow: 3 }}>
            <Avatar
              sx={{ bgcolor: '#EE7301', width: 56, height: 56, m: 'auto' }}
            >
              {/* Mission Icon */}
            </Avatar>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Our Mission
              </Typography>
              <Typography color="text.secondary">
                To deliver innovative and quality solutions that empower our
                customers and communities.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ textAlign: 'center', p: 2, boxShadow: 3 }}>
            <Avatar
              sx={{ bgcolor: '#EE7301', width: 56, height: 56, m: 'auto' }}
            >
              {/* Vision Icon */}
            </Avatar>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Our Vision
              </Typography>
              <Typography color="text.secondary">
                To be the leading provider of exceptional services that inspire
                and connect people worldwide.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ textAlign: 'center', p: 2, boxShadow: 3 }}>
            <Avatar
              sx={{ bgcolor: '#EE7301', width: 56, height: 56, m: 'auto' }}
            >
              {/* Teamwork Icon */}
            </Avatar>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Our Values
              </Typography>
              <Typography color="text.secondary">
                Integrity, collaboration, and commitment to excellence in all
                that we do.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Team Section */}
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Meet Our Team
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Our dedicated team works tirelessly to bring our vision to life.
        </Typography>
        <Grid container spacing={4}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ textAlign: 'center', boxShadow: 3 }}>
                <Avatar
                  alt={`${member.name.first} ${member.name.last}`}
                  src={member.picture.large}
                  sx={{ width: 100, height: 100, m: 'auto', mt: 2 }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {`${member.name.first} ${member.name.last}`}
                  </Typography>
                  <Typography color="text.secondary">{member.email}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default AboutUs;
