
import 'dotenv/config';
import mongoose from 'mongoose';
import { Base } from '../src/models/Base.js';
import { Asset } from '../src/models/Asset.js';
import { Inventory } from '../src/models/Inventory.js';

async function run() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI not set');
  await mongoose.connect(uri);

  await Promise.all([Base.deleteMany({}), Asset.deleteMany({}), Inventory.deleteMany({})]);

  const [hyd, sec] = await Base.create([
    { code: 'HYD-01', name: 'Hitec City Base', location: { address: 'Hitec City, Hyderabad' } },
    { code: 'SEC-02', name: 'Secunderabad Base', location: { address: 'Secunderabad, Hyderabad' } }
  ]);

  const [rifle, jeep, radio, kit, fuel] = await Asset.create([
    { nsn: 'WPN-0001', name: 'Rifle', category: 'Weapon', unitOfMeasure: 'pcs', minThreshold: 10 },
    { nsn: 'VEH-0001', name: 'Jeep', category: 'Vehicle', unitOfMeasure: 'pcs', minThreshold: 1 },
    { nsn: 'COM-0001', name: 'Radio', category: 'Comms', unitOfMeasure: 'pcs', minThreshold: 5 },
    { nsn: 'MED-0001', name: 'First Aid Kit', category: 'Medical', unitOfMeasure: 'pcs', minThreshold: 10 },
    { nsn: 'FUEL-0001', name: 'Fuel Can', category: 'Supply', unitOfMeasure: 'litres', minThreshold: 50 }
  ]);

  await Inventory.create([
    { baseId: hyd._id, assetId: rifle._id, onHand: 120, reserved: 5 },
    { baseId: hyd._id, assetId: jeep._id, onHand: 5, reserved: 0 },
    { baseId: hyd._id, assetId: radio._id, onHand: 40, reserved: 2 },
    { baseId: hyd._id, assetId: kit._id, onHand: 80, reserved: 5 },
    { baseId: hyd._id, assetId: fuel._id, onHand: 500, reserved: 50 },

    { baseId: sec._id, assetId: rifle._id, onHand: 60, reserved: 2 },
    { baseId: sec._id, assetId: jeep._id, onHand: 3, reserved: 0 },
    { baseId: sec._id, assetId: radio._id, onHand: 25, reserved: 1 },
    { baseId: sec._id, assetId: kit._id, onHand: 50, reserved: 3 },
    { baseId: sec._id, assetId: fuel._id, onHand: 300, reserved: 20 }
  ]);

  console.log('Seed complete.');
  await mongoose.disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
