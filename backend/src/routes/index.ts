
import { Router } from 'express';
import { demoAuth, requireRole } from '../middlewares/auth.js';
import { Base } from '../models/Base.js';
import { Asset } from '../models/Asset.js';
import { Inventory } from '../models/Inventory.js';
import { TransferOrder } from '../models/TransferOrder.js';

export const apiRouter = Router();

apiRouter.use(demoAuth);

// Bases
apiRouter.get('/bases', async (_req, res) => {
  const items = await Base.find().sort({ createdAt: -1 });
  res.json(items);
});
apiRouter.post('/bases', requireRole('ADMIN'), async (req, res) => {
  const doc = await Base.create(req.body);
  res.status(201).json(doc);
});

// Assets
apiRouter.get('/assets', async (_req, res) => {
  const items = await Asset.find().sort({ createdAt: -1 });
  res.json(items);
});
apiRouter.post('/assets', requireRole('OFFICER','ADMIN'), async (req, res) => {
  const doc = await Asset.create(req.body);
  res.status(201).json(doc);
});

// Inventory (read-only demo)
apiRouter.get('/inventory', async (req, res) => {
  const { baseId, assetId } = req.query;
  const q: any = {};
  if (baseId) q.baseId = baseId;
  if (assetId) q.assetId = assetId;
  const items = await Inventory.find(q).populate('baseId').populate('assetId');
  res.json(items);
});

// Transfers (very simplified)
apiRouter.get('/transfers', async (_req, res) => {
  const items = await TransferOrder.find().sort({ createdAt: -1 }).populate('fromBaseId toBaseId requestedBy items.assetId');
  res.json(items);
});
apiRouter.post('/transfers', requireRole('OFFICER','ADMIN'), async (req, res) => {
  const user = (req as any).user;
  const payload = {
    ...req.body,
    requestedBy: user?.id,
    status: 'DRAFT',
    timeline: [{ status: 'DRAFT', at: new Date(), by: user?.id }]
  };
  const doc = await TransferOrder.create(payload);
  res.status(201).json(doc);
});
apiRouter.post('/transfers/:id/submit', requireRole('OFFICER','ADMIN'), async (req, res) => {
  const user = (req as any).user;
  const doc = await TransferOrder.findByIdAndUpdate(req.params.id, {
    status: 'PENDING_APPROVAL',
    $push: { timeline: { status: 'PENDING_APPROVAL', at: new Date(), by: user?.id } }
  }, { new: true });
  res.json(doc);
});
apiRouter.post('/transfers/:id/approve', requireRole('ADMIN'), async (req, res) => {
  const user = (req as any).user;
  const doc = await TransferOrder.findByIdAndUpdate(req.params.id, {
    status: 'APPROVED',
    $push: { timeline: { status: 'APPROVED', at: new Date(), by: user?.id } }
  }, { new: true });
  res.json(doc);
});
