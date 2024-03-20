require('dotenv').config();
const mongoose = require('mongoose')

let Person;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    // Continue with your application logic here
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

  const personSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Required field of type String
    age: Number, // Field of type Number
    favoriteFoods: [String] // Field of type array of Strings
  });
  
  // Create model from personSchema and assign it to the existing variable Person
  Person = mongoose.model('Person', personSchema);

  const createAndSavePerson = (done) => {
    // Create a document instance using the Person model constructor
    const person = new Person({
      name: 'Sarav Austin',
      age: 27,
      favoriteFoods: ['Pizza', 'Burgers']
    });
  
    // Call the save method on the document instance
    person.save((err, data) => {
      if (err) {
        // If an error occurs, pass it to the done callback
        return done(err);
      }
      // If the person is saved successfully, pass the data to the done callback
      done(null, data);
    });
  };

  const createManyPeople = (arrayOfPeople, done) => {
    // Use the Model.create() method to create many people
    Person.create(arrayOfPeople, (err, data) => {
      if (err) {
        // If an error occurs, pass it to the done callback
        return done(err);
      }
      // If the people are saved successfully, pass the data to the done callback
      done(null, data);
    });
  };

  const findPeopleByName = (personName, done) => {
    // Use Model.find() to find all people with the given name
    Person.find({ name: personName }, (err, data) => {
      if (err) {
        // If an error occurs, pass it to the done callback
        return done(err);
      }
      // If the search is successful, pass the found data to the done callback
      done(null, data);
    });
  };

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) {
      // If an error occurs, pass it to the done callback
      return done(err);
    }
    // If the search is successful, pass the found data to the done callback
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, (err, data) => {
    if (err) {
      // If an error occurs, pass it to the done callback
      return done(err);
    }
    // If the search is successful, pass the found data to the done callback
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  // Find the person by _id
  Person.findById(personId, (err, person) => {
    if (err) {
      // If an error occurs, pass it to the done callback
      return done(err);
    }
    if (!person) {
      // If no person is found with the given _id, return an error
      return done({ message: 'Person not found' });
    }
    
    // Add "hamburger" to the list of favoriteFoods
    person.favoriteFoods.push(foodToAdd);
    
    // Save the updated person
    person.save((err, updatedPerson) => {
      if (err) {
        // If an error occurs during the save operation, pass it to the done callback
        return done(err);
      }
      // If the person is saved successfully, pass the updated person to the done callback
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  // Use findOneAndUpdate to find a person by name and update their age
  Person.findOneAndUpdate(
    // Query: find the person by name
    { name: personName },
    // Update: set the age to ageToSet
    { age: ageToSet },
    // Options: return the updated document
    { new: true },
    // Callback function
    (err, updatedPerson) => {
      if (err) {
        // If an error occurs, pass it to the done callback
        return done(err);
      }
      // If the update is successful, pass the updated person to the done callback
      done(null, updatedPerson);
    }
  );
};

const removeById = (personId, done) => {
  // Use findByIdAndRemove to remove a person by their ID
  Person.findByIdAndRemove(personId, (err, removedPerson) => {
    if (err) {
      // If an error occurs, pass it to the done callback
      return done(err);
    }
    // If the removal is successful, pass the removed person to the done callback
    done(null, removedPerson);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  // Use deleteMany() to delete all people with the name "Mary"
  Person.remove({ name: nameToRemove }, (err, result) => {
    if (err) {
      // If an error occurs, pass it to the done callback
      return done(err);
    }
    // If the removal is successful, pass the result to the done callback
    done(null, result);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  // Chain the query methods: find, sort, limit, select, exec
  Person.find({ favoriteFoods: foodToSearch }) // Find people who like the specified food
    .sort({ name: 1 }) // Sort them by name in ascending order
    .limit(2) // Limit the results to two documents
    .select({ age: 0 }) // Hide their age
    .exec((err, data) => { // Execute the query
      if (err) {
        // If an error occurs, pass it to the done callback
        return done(err);
      }
      // If the query is successful, pass the data to the done callback
      done(null, data);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
