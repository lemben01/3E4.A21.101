import expressValidator from 'express-validator';
const { body } = expressValidator;

class PlanetValidator {
    complet() {
        //POST and PUT
        return [
            body('name').exists().withMessage('Le nom de la planet est requis'),
            body('discoveryDate').exists().withMessage('La date de decouverte est requise'),
            body('temperature').exists().withMessage('La valeur de la temperature est requise'),
            body('position.x').exists().withMessage('La position en x est requise'),
            body('position.y').exists().withMessage('La position en y est requise'),
            body('position.y').exists().withMessage('La position en z est requise'),
            ...this.partial(),
        ];
    }

    partial() {
        //PATCH
        return [
            body('discoveryDate').optional()
                .isISO8601().withMessage('Doit etre une date').bail()
                .isBefore(new Date().toISOString()).withMessage('Doit etre dans le passe'),
            body('temperature').optional()
                .isNumeric().withMessage('La valeur de la temperature doit etre numerique'),
            body('satellites').optional()
                .isArray().withMessage('Les satellites doivent etre un tableau'),
            body('position.x').optional()
                .isFloat({ min: -1000, max: 1000 }).withMessage('La position en x doit etre comprise entre -1000 et 1000'),
            body('position.y').optional()
                .isFloat({ min: -1000, max: 1000 }).withMessage('La position en y doit etre comprise entre -1000 et 1000'),
            body('position.z').optional()
                .isFloat({ min: -1000, max: 1000 }).withMessage('La position en z doit etre comprise entre -1000 et 1000'),
        ];
    }
}

export default new PlanetValidator();