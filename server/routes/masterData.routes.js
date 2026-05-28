import { Router } from 'express';

import { create, detail, list, remove, update } from '../controllers/masterData.controller.js';
import { protect, restrictTo } from '../middleware/auth.middleware.js';
import {
  idValidation,
  masterDataValidation,
  resourceValidation
} from '../validations/masterData.validation.js';
import { validateRequest } from '../validations/validation.middleware.js';

const router = Router();

router.use(protect);

router
  .route('/:resource')
  .get(resourceValidation, validateRequest, list)
  .post(
    restrictTo('admin'),
    resourceValidation,
    masterDataValidation,
    validateRequest,
    create
  );

router
  .route('/:resource/:id')
  .get(resourceValidation, idValidation, validateRequest, detail)
  .put(
    restrictTo('admin'),
    resourceValidation,
    idValidation,
    masterDataValidation,
    validateRequest,
    update
  )
  .delete(restrictTo('admin'), resourceValidation, idValidation, validateRequest, remove);

export default router;
