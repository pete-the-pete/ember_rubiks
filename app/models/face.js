var Face = DS.Model.extend({
  side: DS.attr('string'),
  color: DS.attr('string')
});

Face.reopenClass({
  FIXTURES: [
    {
      id:1,
      side:'left',
      color:'orange'
    },
    {
      id:2,
      side:'back',
      color:'green'
    },
    {
      id:3,
      side:'right',
      color:'red'
    },
    {
      id:4,
      side:'front',
      color:'yellow'
    },
    {
      id:5,
      side:'top',
      color:'white'
    },
    {
      id:6,
      side:'bottom',
      color:'blue'
    }
  ]
});

export default Face;