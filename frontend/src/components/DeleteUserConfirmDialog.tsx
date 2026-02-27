import { AlertTriangle } from 'lucide-react';
import type { Principal } from '@icp-sdk/core/principal';
import { useDeleteUserProfile } from '../hooks/useAdminQueries';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface DeleteUserConfirmDialogProps {
  principal: Principal;
  open: boolean;
  onClose: () => void;
}

export default function DeleteUserConfirmDialog({
  principal,
  open,
  onClose,
}: DeleteUserConfirmDialogProps) {
  const deleteUserMutation = useDeleteUserProfile();

  const handleConfirm = async () => {
    try {
      await deleteUserMutation.mutateAsync(principal);
      onClose();
    } catch (error) {
      // Error is handled by the mutation's onError callback
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            Delete User Profile
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-3">
            <p>Are you sure you want to delete this user profile?</p>
            <div className="bg-accent p-3 rounded-lg">
              <p className="text-xs font-mono break-all text-foreground">
                {principal.toString()}
              </p>
            </div>
            <p className="text-destructive font-semibold">
              This action cannot be undone. All user data including quiz results and bookmarks will be permanently deleted.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={onClose}
            disabled={deleteUserMutation.isPending}
            className="min-h-[44px]"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={deleteUserMutation.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 min-h-[44px]"
          >
            {deleteUserMutation.isPending ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
