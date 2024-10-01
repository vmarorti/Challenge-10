const fs = require('fs');
const inquirer = require('inquirer');
const {Square, Triangle, Circle} = require('./lib/shapes.js');

const questions = [      
    {
        name: 'text',
        message: 'Please enter logo text.',
        validate: input => input.length <= 3 || 'Text must be three characters or less.'
    },
    {
        message: 'Please choose a text color.',
        name: 'textColor',
    },
    {
        message: 'Please choose a background color.',
        name: 'bgColor',
    },
    {
        type: 'list',
        message: 'Please choose a shape.',
        name: 'shape',
        choices: ['Triangle', 'Circle', 'Square'],
    }
];
function init() {

    inquirer.prompt(questions).then(response => {
        let shape;
        switch (response.shape) {
            case 'Triangle':
                shape = new Triangle();
                break;
            case 'Circle':
                shape = new Circle();
                break;
            case 'Square':
                shape = new Square();
                break;                        
        };
        shape.setColor(response.bgColor);
                 
        const svgObject = `
            <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
            ${shape.render()}
            <text x="150" y="125" font-size="60" text-anchor="middle" fill="${response.textColor}">${response.text}</text>
             </svg>
        `;
                    
        fs.writeFileSync('logo.svg', svgObject);
        console.log('Logo has been created');      
    });
                
};

init();        