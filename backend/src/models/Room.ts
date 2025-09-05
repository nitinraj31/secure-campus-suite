import mongoose, { Document, Schema } from 'mongoose';

export interface IRoom extends Document {
  id: string;
  block: string;
  floor: number;
  capacity: number;
  occupied: number;
  type: string;
  status: 'Available' | 'Occupied' | 'Partially Occupied' | 'Maintenance';
  students: string[];
  createdAt: Date;
  updatedAt: Date;
}

const RoomSchema: Schema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  block: {
    type: String,
    required: true
  },
  floor: {
    type: Number,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  occupied: {
    type: Number,
    required: true,
    default: 0
  },
  type: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Available', 'Occupied', 'Partially Occupied', 'Maintenance'],
    default: 'Available'
  },
  students: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
});

export default mongoose.model<IRoom>('Room', RoomSchema);
